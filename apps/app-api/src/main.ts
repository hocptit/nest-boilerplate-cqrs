import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';

import { EEnvKey } from '@app/constants/env.constant';
import { ResponseTransformInterceptor } from '@libs/infra/interceptors/request-response.interceptor';
import { HttpExceptionFilter } from '@libs/infra/middleware/http-exception.filter';
import { UnknownExceptionsFilter } from '@libs/infra/middleware/unknown-exceptions.filter';
import { BodyValidationPipe } from '@libs/infra/pipes/validation.pipe';
import { initSwagger } from '@libs/infra/swagger';

import { AppModule } from './app.module';
import { LoggerService } from '@libs/shared/modules';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const loggingService = app.get(LoggerService);
  const logger = loggingService.getLogger('Main');
  app.useGlobalInterceptors(
    new ResponseTransformInterceptor(loggingService, configService),
  );
  app.useGlobalFilters(new UnknownExceptionsFilter(loggingService));
  app.useGlobalFilters(new HttpExceptionFilter(loggingService));

  app.useGlobalPipes(new BodyValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors();
  initSwagger(app, configService);
  app.use('/assets', express.static('assets'));
  await app.listen(configService.get<number>(EEnvKey.PORT) || 3000);
  logger.info(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
