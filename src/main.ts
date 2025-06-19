import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';

import { EEnvKey } from '@constants/env.constant';
import { ResponseTransformInterceptor } from 'infra/interceptors/request-response.interceptor';
import { HttpExceptionFilter } from 'infra/middleware/http-exception.filter';
import { UnknownExceptionsFilter } from 'infra/middleware/unknown-exceptions.filter';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { BodyValidationPipe } from 'infra/pipes/validation.pipe';
import { initSwagger } from 'infra/swagger';

import { AppModule } from './app.module';

/**
 * Bootstrap function that initializes and starts the NestJS application.
 * Sets up all necessary middleware, interceptors, filters, and configuration.
 * 
 * @async
 * @function bootstrap
 * @returns {Promise<void>}
 */
async function bootstrap(): Promise<void> {
  // Create NestJS application instance
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Get configuration and logging services
  const configService = app.get(ConfigService);
  const loggingService = app.get(LoggerService);
  const logger = loggingService.getLogger('Main');

  // Configure global interceptors for request/response transformation
  app.useGlobalInterceptors(
    new ResponseTransformInterceptor(loggingService, configService),
  );

  // Configure global exception filters (order matters - most specific first)
  app.useGlobalFilters(new UnknownExceptionsFilter(loggingService));
  app.useGlobalFilters(new HttpExceptionFilter(loggingService));

  // Configure global validation pipe for request body validation
  app.useGlobalPipes(new BodyValidationPipe());

  // Set global API prefix
  app.setGlobalPrefix('api');

  // Enable CORS for cross-origin requests
  app.enableCors();

  // Initialize Swagger documentation
  initSwagger(app, configService);

  // Serve static assets
  app.use('/assets', express.static('assets'));

  // Start the application
  const port = configService.get<number>(EEnvKey.PORT) || 3000;
  await app.listen(port);
  
  logger.info(`🚀 Application is running on: ${await app.getUrl()}`);
  logger.info(`📚 Swagger documentation available at: ${await app.getUrl()}/api-docs`);
}

// Start the application and handle any bootstrap errors
bootstrap().catch((error) => {
  console.error('❌ Failed to start application:', error);
  process.exit(1);
});
