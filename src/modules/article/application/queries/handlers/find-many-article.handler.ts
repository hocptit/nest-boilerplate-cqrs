import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindManyArticlesQuery } from '../impl/find-many-article.query';
import ArticleRepository from 'models/repositories/Article.repository';
import { BaseQueryHandler } from '@shared/cqrs/queries/query-handler.base';
import { LoggerService } from '@shared/modules/loggers/logger.service';

@QueryHandler(FindManyArticlesQuery)
export class FindManyArticlesQueryHandler
  extends BaseQueryHandler
  implements IQueryHandler<FindManyArticlesQuery>
{
  constructor(
    private readonly articleRepository: ArticleRepository,
    protected loggerService: LoggerService,
  ) {
    super(loggerService, FindManyArticlesQueryHandler.name);
  }

  async execute(query: FindManyArticlesQuery) {
    this.logger.info('FindManyArticlesHandler');
    return this.articleRepository.articleDocumentModel.find();
  }
}
