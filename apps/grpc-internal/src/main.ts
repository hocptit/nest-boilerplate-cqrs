import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/grpc/app.module';
import * as dotenv from 'dotenv';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { LEARNING_PACKAGE_NAME } from '@assets/proto/learning/learning';
import { getProtoPath } from '@libs/shared';

dotenv.config();

async function bootstrap() {
  const port = process.env.GRPC_PORT || 3000;

  const app = await NestFactory.create(AppModule);
  const grpcURL = `0.0.0.0:${port}`;

  const LEARNING_PROTO_PATH = getProtoPath('learning', 'learning.proto');
  console.log(LEARNING_PROTO_PATH);
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
  await app.startAllMicroservices().then(() => {
    console.log(`GRPC server started at ${grpcURL}`);
  });
  await app.init();
}
bootstrap();
