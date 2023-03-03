import { LoggerService, LoggerWithContext } from "@shared/modules/loggers/logger.service";

export class BaseQueryHandler {
  protected logger: LoggerWithContext;
  constructor(
    protected loggerService: LoggerService,
    commandName: string,
  ) {
    this.logger = new LoggerWithContext(
      this.loggerService.getLogger(commandName),
    );
  }
}