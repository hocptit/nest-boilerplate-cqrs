import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandHandlers } from './cqrs/commands/handlers';
import { ArticleCommandsController } from './controllers';
import ArticleRepository from 'modules/article/domain/models/repositories/Article.repository';
import { ArticlesService } from './services/article.service';
import { QueryHandlers } from './cqrs/queries/handlers';
import { ArticleSchema } from '@modules/article/domain/models/schemas/Article.schema';
import { EventHandlers } from './cqrs/events/handlers/index';
import { ArticleSagas } from './cqrs/sagas/article.sagas';
import { ArticleQueriesController } from './controllers';
import { ArticleMapper } from './mappers/article.mapper';
import { ArticleSchemaInstance } from './domain/models/schemas/Article.schema';

const mappers: Provider[] = [ArticleMapper];
@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: ArticleSchema.name,
        // instance
        schema: ArticleSchemaInstance,
      },
    ]),
  ],
  controllers: [ArticleCommandsController, ArticleQueriesController],
  providers: [
    ArticleRepository,
    ArticlesService,
    ...mappers,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    ArticleSagas,
  ],
})
export class ArticlesModule {}
