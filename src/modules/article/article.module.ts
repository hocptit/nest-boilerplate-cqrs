import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandHandlers } from './cqrs/commands/handlers';
import { ArticleCommandsController } from './controllers';
import ArticleRepository from 'modules/article/domain/models/repositories/Article.repository';
import { ArticlesService } from './services/article.service';
import { QueryHandlers } from './cqrs/queries/handlers';
import {
  ArticleSchema,
  Article,
} from '@modules/article/domain/models/schemas/Article.schema';
import { EventHandlers } from './cqrs/events/handlers/index';
import { ArticleSagas } from './cqrs/sagas/article.sagas';
import { ArticleQueriesController } from './controllers';

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
  controllers: [ArticleCommandsController, ArticleQueriesController],
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
