import { HttpException, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { memoryStorage } from 'multer';
import { ConsoleModule } from 'nestjs-console';
import { SentryInterceptor, SentryModule } from '@ntegral/nestjs-sentry';
import * as Tracing from '@sentry/tracing';
import { ConfigurationModule } from '@config/config.module';
import { DatabaseModule } from '@config/database.module';
import * as Sentry from '@sentry/node';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import * as PI from '@sentry/profiling-node';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MODULES } from './modules';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EEnvKey } from '@constants/env.constant';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    LoggingModule,
    ConsoleModule,
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        debug: config.get<string>(EEnvKey.SENTRY_DEBUG) === 'true',
        dsn: config.get<string>(EEnvKey.SENTRY_DSN),
        environment:
          config.get<string>(EEnvKey.NODE_ENV) === 'development'
            ? 'dev'
            : 'production',
        enabled: config.get<string>(EEnvKey.SENTRY_ENABLED) === 'true',
        logLevels:
          config.get<string>(EEnvKey.SENTRY_DEBUG) === 'true'
            ? ['debug']
            : ['log'],
        release: 'nest-cqrs@' + process.env.npm_package_version,
        autoSessionTracking: true,
        integrations: [
          new Tracing.Integrations.Mongo({
            useMongoose:
              config.get<string>(EEnvKey.SENTRY_MONGO_ENABLED) === 'true',
          }),
          // enable HTTP calls tracing
          new Sentry.Integrations.Http({
            tracing: config.get<string>(EEnvKey.SENTRY_HTTP_ENABLED) === 'true',
          }),
          new PI.ProfilingIntegration(),
        ],
        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0,
        profilesSampleRate: 1.0,
        // beforeSend: function (e, b) {
        //   console.log('beforeSend', e, b);
        // },
        // beforeSendTransaction: function (e, b) {
        //   console.log('beforeSendTransaction', e, b);
        // },
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({
      storage: memoryStorage(),
    }),
    ScheduleModule.forRoot(),
    ...MODULES,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useFactory: () =>
        new SentryInterceptor({
          filters: [
            {
              type: HttpException,
              filter: (exception: HttpException) => 500 > exception.getStatus(),
            },
          ],
          user: true,
        }),
    },
  ],
})
export class AppModule {}
