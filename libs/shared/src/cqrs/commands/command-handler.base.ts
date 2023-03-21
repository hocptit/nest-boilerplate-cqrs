import { LoggerService, LoggerPort } from '@libs/shared/modules';

export class BaseCommandHandler {
  protected logger: LoggerPort;
  constructor(protected loggerService: LoggerService, commandName: string) {
    this.logger = new LoggerPort(this.loggerService.getLogger(commandName));
  }
}
