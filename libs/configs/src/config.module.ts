import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { EEnvKey } from '@app/constants/env.constant';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      validationSchema: Joi.object({
        // todo: add validation
        [EEnvKey.NODE_ENV]: Joi.string().valid('development', 'production'),
        [EEnvKey.PORT]: Joi.number().default(3000),
        [EEnvKey.SWAGGER_PATH]: Joi.string(),
      }),
      load: [],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigurationModule {}
