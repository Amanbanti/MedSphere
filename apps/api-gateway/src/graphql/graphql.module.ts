import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import type { GatewayConfig } from '../config/gateway.config';
import { HealthResolver } from './health.resolver';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<GatewayConfig>('gateway')!;
        return {
          autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
          sortSchema: true,
          path: config.graphql.path,
          playground: config.graphql.playground,
          context: ({ req }: { req: { correlationId?: string; user?: unknown } }) => ({
            correlationId: req.correlationId,
            user: req.user,
          }),
        };
      },
    }),
  ],
  providers: [HealthResolver],
})
export class GatewayGraphqlModule {}
