/**
 * CQRS command bus for patient service.
 */
import type { JwtAccessPayload } from '@medsphere/shared';

export interface PatientCommand {
  readonly actor: JwtAccessPayload;
  readonly organizationId: string;
  readonly correlationId?: string;
}

export interface CommandHandler<TCommand extends PatientCommand, TResult = unknown> {
  execute(command: TCommand): Promise<TResult>;
}

export interface CommandBus {
  dispatch<TCommand extends PatientCommand, TResult = unknown>(
    command: TCommand,
  ): Promise<TResult>;
}

export class InMemoryCommandBus implements CommandBus {
  private readonly handlers = new Map<string, CommandHandler<PatientCommand>>();

  register<TCommand extends PatientCommand>(
    commandName: string,
    handler: CommandHandler<TCommand>,
  ): void {
    this.handlers.set(commandName, handler as CommandHandler<PatientCommand>);
  }

  async dispatch<TCommand extends PatientCommand, TResult = unknown>(
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
