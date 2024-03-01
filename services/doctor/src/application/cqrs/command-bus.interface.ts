/**
 * CQRS command bus for doctor service.
 */
import type { JwtAccessPayload } from '@medsphere/shared';

export interface DoctorCommand {
  readonly actor: JwtAccessPayload;
  readonly organizationId: string;
  readonly correlationId?: string;
}

export interface CommandHandler<TCommand extends DoctorCommand, TResult = unknown> {
  execute(command: TCommand): Promise<TResult>;
}

export interface CommandBus {
  dispatch<TCommand extends DoctorCommand, TResult = unknown>(
    command: TCommand,
  ): Promise<TResult>;
}

export class InMemoryCommandBus implements CommandBus {
  private readonly handlers = new Map<string, CommandHandler<DoctorCommand>>();

  register<TCommand extends DoctorCommand>(
    commandName: string,
    handler: CommandHandler<TCommand>,
  ): void {
    this.handlers.set(commandName, handler as CommandHandler<DoctorCommand>);
  }

  async dispatch<TCommand extends DoctorCommand, TResult = unknown>(
    command: TCommand,
  ): Promise<TResult> {
    const name = command.constructor.name;
    const handler = this.handlers.get(name);
    if (!handler) {
      throw new Error(`No handler registered for command: ${name}`);
    }
    return handler.execute(command) as Promise<TResult>;
  }
}
