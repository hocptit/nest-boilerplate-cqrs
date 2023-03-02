import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { memoryStorage } from 'multer';
import { ConsoleModule } from 'nestjs-console';

import { ConfigurationModule } from '@config/config.module';
import { DatabaseModule } from '@config/database.module';

import { LoggingModule } from '@shared/modules/loggers/logger.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MODULES } from './modules';
import { RequestContextModule } from 'nestjs-request-context';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from 'infra/application/context/ContextInterceptor';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    LoggingModule,
    ConsoleModule,
    RequestContextModule,
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
      useClass: ContextInterceptor,
    },
  ],
})
export class AppModule {}
