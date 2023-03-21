import { LoggerService, LoggerPort } from '@libs/shared/modules';

export class BaseEventHandler {
  protected logger: LoggerPort;
  constructor(protected loggerService: LoggerService, eventName: string) {
    this.logger = new LoggerPort(this.loggerService.getLogger(eventName));
  }
}
