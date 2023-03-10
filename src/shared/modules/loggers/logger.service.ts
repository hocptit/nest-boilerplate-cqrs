import { Injectable } from '@nestjs/common';
import { Appender, configure, getLogger, Layout, Logger } from 'log4js';
import { ConfigService } from '@nestjs/config';
import { EEnvKey } from '@constants/env.constant';

const layouts: Record<string, Layout> = {
  console: {
    type: 'pattern',
    pattern: '%[%-6p %d [%c] | %m%]',
  },
  dateFile: {
    type: 'pattern',
    pattern: '%-6p %d [%c] | %m',
  },
};

const appenders: Record<string, Appender> = {
  console: {
    type: 'console',
    layout: layouts.console,
  },
  dateFile: {
    type: 'dateFile',
    filename: 'logs/out.log',
    pattern: '-yyyy-MM-dd',
    layout: layouts.dateFile,
  },
  dateFileAccess: {
    type: 'dateFile',
    filename: 'logs/out.log',
    pattern: '-yyyy-MM-dd',
    layout: layouts.access,
  },
  multi: {
    type: 'multiFile',
    base: 'logs/',
    property: 'categoryName',
    extension: '.log',
  },
};

@Injectable()
export class LoggerService {
  /**
   * config logging
   * @example
   * Import Logging module
   * constructor(protected loggingService: LoggingService) {}
   * logger = this.loggingService.getLogger('serviceA');
   */
  constructor(private configService: ConfigService) {
    const level = configService.get(EEnvKey.LOG_LEVEL);
    const isWriteLog = configService.get(EEnvKey.IS_WRITE_LOG) === 'true';
    configure({
      appenders: appenders,
      categories: {
        default: {
          appenders: isWriteLog ? ['console', 'dateFile'] : ['console'],
          level: level,
          enableCallStack: true,
        },
      },
    });
  }

  getLogger = getLogger;

  logger = {
    default: getLogger('default'),
  };
}

export class LoggerPort {
  constructor(protected logger: Logger) {}
  info(...args: any[]) {
    this.logger.info(args);
  }
  debug(...args: any[]) {
    this.logger.debug(args);
  }
  error(...args: any[]) {
    this.logger.error(args);
  }
  warn(...args: any[]) {
    this.logger.warn(args);
  }
}
