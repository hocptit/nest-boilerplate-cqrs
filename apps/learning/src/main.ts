import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { LEARNING_PACKAGE_NAME } from '@assets/proto/learning/learning';
import { getProtoPath, LoggerService } from '@libs/shared';
import { LearningModule } from '@app/learning/learning.module';
import { EEnvKey } from '@libs/configs/env.constant';
import { useMorgan } from '@libs/infra/middleware/morgan.middleware';
import { ConfigService } from '@nestjs/config';
import { GrpcExceptionFilter } from '@libs/infra/middleware/grpc-exception.filter';
import { initSwagger } from '@libs/infra/swagger';
import { UnknownExceptionsFilter } from '@libs/infra/middleware/grpc-unknown-exception.filter';
import { ResponseTransformInterceptor } from '@libs/infra/interceptors/grpc.interceptor';

dotenv.config();

async function bootstrap() {
  const port = process.env.GRPC_PORT || 3000;
  const app = await NestFactory.create(LearningModule);
  const configService = app.get(ConfigService);
  const loggingService = app.get(LoggerService);
  const logger = loggingService.getLogger('learning-app');
  const grpcURL = `0.0.0.0:${port}`;

  const LEARNING_PROTO_PATH = getProtoPath('learning', 'learning.proto');
  app.useGlobalFilters(new GrpcExceptionFilter(loggingService));
  app.useGlobalFilters(new UnknownExceptionsFilter(loggingService));
  app.useGlobalInterceptors(
    new ResponseTransformInterceptor(loggingService, configService),
  );
  app.connectMicroservice<GrpcOptions>(
    {
      transport: Transport.GRPC,
      options: {
        url: grpcURL,
        loader: {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        },
        package: [LEARNING_PACKAGE_NAME],
        protoPath: [LEARNING_PROTO_PATH],
      },
    },
    {
      inheritAppConfig: true,
    },
  );
  if (configService.get(EEnvKey.NODE_ENV) === 'debug') {
    app.use(useMorgan());
  }
  await app.startAllMicroservices().then(() => {
    logger.info(`GRPC server started at ${grpcURL}`);
  });
  //todo: config port and implement
  // await app.listen('3001');
  // logger.info(`[RestfulLAPI] Application is running on: ${await app.getUrl()}`);
  await app.init();
}
bootstrap();
