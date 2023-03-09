import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindManyArticlesQuery } from '../impl/find-many-article.query';
import ArticleRepository from 'modules/article/domain/models/repositories/Article.repository';
import { BaseQueryHandler } from '@shared/cqrs/queries/query-handler.base';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { ENotFoundArticle } from '../../../domain/article.error';
import { ArticleDocument } from '../../../domain/models/schemas/Article.schema';
import { Err, Result, Ok } from 'oxide.ts';

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

  async execute(
    query: FindManyArticlesQuery,
  ): Promise<Result<ArticleDocument[], ENotFoundArticle>> {
    this.logger.info('FindManyArticlesHandler');
    const data = await this.articleRepository.articleDocumentModel.find();
    return Ok(data);
  }
}
