import {
  LoggerService,
  LoggerPort,
} from '../../modules/loggers/logger.service';

export class BaseQueryHandler {
  protected logger: LoggerPort;
  constructor(protected loggerService: LoggerService, commandName: string) {
    this.logger = new LoggerPort(this.loggerService.getLogger(commandName));
  }
}
