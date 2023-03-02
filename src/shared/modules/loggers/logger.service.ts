import { Injectable } from '@nestjs/common';
import { Appender, configure, getLogger, Layout, Logger } from 'log4js';
import { ConfigService } from '@nestjs/config';
import { EEnvKey } from '@constants/env.constant';
import { RequestContextService } from 'infra/application/context/AppRequestContext';

const layouts: Record<string, Layout> = {
  console: {
    type: 'pattern',
    pattern: '%[%-6p %d [%c] | %m%]',
  },
  dateFile: {
    type: 'pattern',
    pattern: '%-6p %d [%c] | %m',
  },
  access: {
    type: 'pattern',
    pattern: '%[%-6p %d [%c] [address:%x{remoteAddr}] %x{access}%]',
    tokens: {
      remoteAddr: function (logEvent) {
        let remoteAddr = logEvent.data.toString().split(' ', 1).pop();
        remoteAddr = remoteAddr.replace(/^.*:/, '');
        remoteAddr = remoteAddr === '1' ? '127.0.0.1' : remoteAddr;
        return remoteAddr;
      },
      access: function (logEvent) {
        const [, ...data] = logEvent.data.toString().split(' ');
        data.pop();
        return data.join(' ');
      },
    },
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
  access: {
    type: 'console',
    layout: layouts.access,
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
        access: {
          appenders: isWriteLog ? ['access', 'dateFileAccess'] : ['access'],
          level: 'info',
          enableCallStack: true,
        },
      },
    });
  }

  getLogger = getLogger;

  private _access = () => {
    const logger = this.getLogger('access');
    return {
      write: logger.info.bind(logger),
    };
  };

  logger = {
    default: getLogger('default'),
    access: this._access(),
  };
}

export class LoggerWithContext {
  constructor(protected logger: Logger) {}
  info(...args: any[]) {
    this.logger.info(`[${RequestContextService.getRequestId()}]`, ...args);
  }
  debug(...args: any[]) {
    this.logger.debug(`[${RequestContextService.getRequestId()}]`, ...args);
  }
  error(...args: any[]) {
    this.logger.error(`[${RequestContextService.getRequestId()}]`, ...args);
  }
  warn(...args: any[]) {
    this.logger.warn(`[${RequestContextService.getRequestId()}]`, ...args);
  }
}
