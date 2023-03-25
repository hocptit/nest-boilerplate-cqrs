import { Module } from '@nestjs/common';
import { LEARNING_PACKAGE_NAME } from '@assets/proto/learning/learning';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientGrpcProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { EEnvKey } from '@libs/configs/env.constant';
import { getProtoPath } from '@libs/shared/utils';
import { LearningService } from '@libs/grpc-client/learning/learning.service';
import { ArticleService } from '@libs/grpc-client/learning/article.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [
    {
      provide: LEARNING_PACKAGE_NAME,
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>(EEnvKey.GRPC_LEARNING_SERVER_HOST),
            package: LEARNING_PACKAGE_NAME,
            protoPath: getProtoPath(LEARNING_PACKAGE_NAME, 'learning.proto'),
            loader: {
              keepCase: true,
              enums: String,
              oneofs: true,
              arrays: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
    LearningService,
    ArticleService,
  ],
  exports: [LearningService, ArticleService],
})
export class LearningModule {}
