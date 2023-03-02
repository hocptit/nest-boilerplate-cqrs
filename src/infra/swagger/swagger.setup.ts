import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { EEnvKey } from '@constants/env.constant';

export function initSwagger(app, config: ConfigService) {
  const swaggerConfig = {
    isPublic: config.get(EEnvKey.SWAGGER_IS_PUBLIC) === 'true',
    title: config.get(EEnvKey.SWAGGER_TITLE),
    description: config.get(EEnvKey.SWAGGER_DESC),
    version: config.get(EEnvKey.SWAGGER_VERSION),
    server: config.get(EEnvKey.SWAGGER_HOST),
  };
  if (!swaggerConfig.isPublic) return;

  const configSwagger = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addServer(swaggerConfig.server, 'Host')
    .setExternalDoc('Postman Collection', '/docs-json')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('/docs', app, document);
}
