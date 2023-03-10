import {
  LoggerService,
  LoggerPort,
} from '@shared/modules/loggers/logger.service';

export class BaseCommandHandler {
  protected logger: LoggerPort;
  constructor(protected loggerService: LoggerService, commandName: string) {
    this.logger = new LoggerPort(this.loggerService.getLogger(commandName));
  }
}
