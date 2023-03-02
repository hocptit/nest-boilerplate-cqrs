import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { EEnvKey } from '@constants/env.constant';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>(EEnvKey.MONGO_URI);
        return {
          uri,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
