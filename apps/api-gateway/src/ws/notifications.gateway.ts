import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Server, Socket } from 'socket.io';
import { JwtService } from '@medsphere/auth-sdk';
import { createLogger } from '@medsphere/logger';
import { ERROR_CODES, HTTP_STATUS } from '@medsphere/shared';
import type { GatewayConfig } from '../config/gateway.config';
import { WS_EVENTS } from '../constants';

const logger = createLogger({ service: 'api-gateway', module: 'notifications-ws' });

interface AuthenticatedSocket extends Socket {
  data: {
    userId?: string;
    organizationId?: string;
    facilityIds?: string[];
    subscribedChannels: Set<string>;
  };
}

interface SubscribePayload {
  channels: string[];
}

@Injectable()
@WebSocketGateway({
  namespace: '/ws/notifications',
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private readonly jwtService: JwtService;
  private readonly config: GatewayConfig;

  constructor(
    configService: ConfigService,
    jwtService: JwtService,
  ) {
    this.config = configService.get<GatewayConfig>('gateway')!;
    this.jwtService = jwtService;
  }

  afterInit(): void {
    logger.info('Notifications WebSocket gateway initialized', {
      path: this.config.websocket.path,
    });
  }

  async handleConnection(client: AuthenticatedSocket): Promise<void> {
    client.data = { subscribedChannels: new Set<string>() };

    try {
      const user = this.authenticateSocket(client);
      client.data.userId = user.sub;
      client.data.organizationId = user.orgId;
      client.data.facilityIds = user.facilityIds;

      logger.info('WebSocket client connected', {
        socketId: client.id,
        userId: user.sub,
        organizationId: user.orgId,
      });

      client.emit(WS_EVENTS.MESSAGE, {
        type: 'connected',
        userId: user.sub,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.warn('WebSocket authentication failed', {
        socketId: client.id,
        error: error instanceof Error ? error.message : String(error),
      });
      client.emit(WS_EVENTS.ERROR, {
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        errorCode: ERROR_CODES.UNAUTHORIZED,
        message: 'WebSocket authentication failed',
      });
      client.disconnect(true);
    }
  }

  handleDisconnect(client: AuthenticatedSocket): void {
    logger.info('WebSocket client disconnected', {
      socketId: client.id,
      userId: client.data.userId,
      subscribedChannels: [...client.data.subscribedChannels],
    });
  }

  @SubscribeMessage(WS_EVENTS.SUBSCRIBE)
  handleSubscribe(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() payload: SubscribePayload,
  ): void {
    this.ensureAuthenticated(client);

    const channels = payload?.channels ?? [];
    for (const channel of channels) {
      const normalized = this.normalizeChannel(client, channel);
      client.join(normalized);
      client.data.subscribedChannels.add(normalized);
    }

    client.emit(WS_EVENTS.MESSAGE, {
      type: 'subscribed',
      channels: [...client.data.subscribedChannels],
    });
  }

  @SubscribeMessage(WS_EVENTS.UNSUBSCRIBE)
  handleUnsubscribe(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() payload: SubscribePayload,
  ): void {
    this.ensureAuthenticated(client);

    const channels = payload?.channels ?? [];
    for (const channel of channels) {
      const normalized = this.normalizeChannel(client, channel);
      client.leave(normalized);
      client.data.subscribedChannels.delete(normalized);
    }

    client.emit(WS_EVENTS.MESSAGE, {
      type: 'unsubscribed',
      channels: [...client.data.subscribedChannels],
    });
  }

  @SubscribeMessage(WS_EVENTS.PING)
  handlePing(@ConnectedSocket() client: AuthenticatedSocket): void {
    client.emit(WS_EVENTS.PONG, { timestamp: new Date().toISOString() });
  }

  fanout(channel: string, message: unknown): void {
    this.server.to(channel).emit(WS_EVENTS.MESSAGE, message);
  }

  fanoutToOrganization(organizationId: string, message: unknown): void {
    this.fanout(`org:${organizationId}`, message);
  }

  fanoutToUser(userId: string, message: unknown): void {
    this.fanout(`user:${userId}`, message);
  }

  private authenticateSocket(client: AuthenticatedSocket) {
    const token =
      this.extractToken(client.handshake.auth?.token) ??
      this.extractToken(client.handshake.headers.authorization) ??
      this.extractToken(client.handshake.query.token);

    if (!token) {
      throw new UnauthorizedException('Missing WebSocket auth token');
    }

    return this.jwtService.verifyAccess(token);
  }

  private extractToken(value: unknown): string | undefined {
    if (typeof value !== 'string' || !value) {
      return undefined;
    }
    if (value.startsWith('Bearer ')) {
      return value.slice('Bearer '.length).trim();
    }
    return value;
  }

  private ensureAuthenticated(client: AuthenticatedSocket): void {
    if (!client.data.userId) {
      throw new UnauthorizedException('Socket not authenticated');
    }
  }

  private normalizeChannel(
    client: AuthenticatedSocket,
    channel: string,
  ): string {
    if (channel.startsWith('user:') || channel.startsWith('org:')) {
      return channel;
    }
    return `org:${client.data.organizationId}:${channel}`;
  }
}
