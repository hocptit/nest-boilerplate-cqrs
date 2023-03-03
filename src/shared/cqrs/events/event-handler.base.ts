import { LoggerService, LoggerWithContext } from "@shared/modules/loggers/logger.service";

export class BaseEventHandler {
  protected logger: LoggerWithContext;
  constructor(
    protected loggerService: LoggerService,
    eventName: string,
  ) {
    this.logger = new LoggerWithContext(
      this.loggerService.getLogger(eventName),
    );
  }
}