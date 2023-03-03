import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandHandlers } from './application/commands/handlers';
import { ArticleController } from './controllers/article.controller';
import ArticleRepository from 'models/repositories/Article.repository';
import { ArticlesService } from './services/article.service';
import { QueryHandlers } from './application/queries/handlers';
import {
  ArticleSchema,
  Article,
} from '@models/schemas/Article.schema';
import { EventHandlers } from './application/events/handlers/index';
import { ArticleSagas } from './application/sagas/article.sagas';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: Article.name,
        schema: ArticleSchema,
      },
    ]),
  ],
  controllers: [ArticleController],
  providers: [
    ArticleRepository,
    ArticlesService,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    ArticleSagas,
  ],
})
export class ArticlesModule implements OnModuleInit {
  onModuleInit() {}
}
