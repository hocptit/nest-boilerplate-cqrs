import { ArticlesModule } from '@app/learning/modules/article/article.module';
import { ConfigurationModule, DatabaseModule } from '@libs/configs';
import { LoggingModule } from '@libs/shared';

export const MODULES = [
  ConfigurationModule,
  LoggingModule,
  DatabaseModule,
  ArticlesModule,
];
