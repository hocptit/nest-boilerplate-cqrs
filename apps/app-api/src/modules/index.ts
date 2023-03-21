import { CommandModule } from '@app/modules/command/seeder.module';
import { ArticlesModule } from './article/article.module';
import { LearningApiModule } from '@app/modules/learning-api/learning-api.module';

export const MODULES = [CommandModule, ArticlesModule, LearningApiModule];
