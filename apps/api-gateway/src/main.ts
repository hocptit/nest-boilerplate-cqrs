import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { EEnvKey } from '@libs/configs/env.constant';
import { ResponseTransformInterceptor } from '@libs/infra/interceptors/request-response.interceptor';
import { HttpExceptionFilter } from '@libs/infra/middleware/http-exception.filter';
import { HttpUnknownExceptionsFilter } from '@libs/infra/middleware/http-unknown-exceptions.filter';
import { BodyValidationPipe } from '@libs/infra/pipes/validation.pipe';
import { initSwagger } from '@libs/infra/swagger';

import { ApiGatewayModule } from './api-gateway.module';
import { LoggerService } from '@libs/shared/modules';
import { useMorgan } from '@libs/infra/middleware/morgan.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    ApiGatewayModule,
  );
  const configService = app.get(ConfigService);
  const loggingService = app.get(LoggerService);
  const logger = loggingService.getLogger('api-gateway');
  app.useGlobalInterceptors(
    new ResponseTransformInterceptor(loggingService, configService),
  );
  app.useGlobalFilters(new HttpUnknownExceptionsFilter(loggingService));
  app.useGlobalFilters(new HttpExceptionFilter(loggingService));

  app.useGlobalPipes(new BodyValidationPipe());
  app.setGlobalPrefix('api');
  if (configService.get(EEnvKey.NODE_ENV) === 'debug') {
    app.use(useMorgan());
  }
  app.enableCors();
  if (configService.get(EEnvKey.NODE_ENV) !== 'production') {
    initSwagger(app, configService);
  }
  await app.listen(configService.get<number>(EEnvKey.PORT) || 3000);
  logger.info(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
