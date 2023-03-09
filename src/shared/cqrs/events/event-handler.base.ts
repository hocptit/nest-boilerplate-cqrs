import {
  LoggerService,
  LoggerPort,
} from '@shared/modules/loggers/logger.service';

export class BaseEventHandler {
  protected logger: LoggerPort;
  constructor(protected loggerService: LoggerService, eventName: string) {
    this.logger = new LoggerPort(this.loggerService.getLogger(eventName));
  }
}
