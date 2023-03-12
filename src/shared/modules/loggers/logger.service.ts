import { Injectable } from '@nestjs/common';
import {
  Appender,
  configure,
  DateFileAppender,
  getLogger,
  Layout,
  Logger,
} from 'log4js';
import { ConfigService } from '@nestjs/config';
import { EEnvKey } from '@constants/env.constant';
import { datadogLogs } from '@datadog/browser-logs';

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

const appenders: Record<string, Appender | DateFileAppender> = {
  console: {
    type: 'console',
    layout: layouts.console,
  },
  dateFile: {
    type: 'dateFile',
    filename: 'logs/out.log',
    maxLogSize: 10000000,
    pattern: '-yyyy-MM-dd',
    layout: layouts.dateFile,
    keepFileExt: true,
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
    datadogLogs.init({
      clientToken: configService.get(EEnvKey.DATADOG_LOGS_CLIENT_TOKEN),
      site: configService.get(EEnvKey.DATADOG_LOGS_URL),
      forwardErrorsToLogs: true,
      sessionSampleRate: 100,
    });
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
    datadogLogs.logger.info('Button clicked', { name: 'buttonName', id: 123 });
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
