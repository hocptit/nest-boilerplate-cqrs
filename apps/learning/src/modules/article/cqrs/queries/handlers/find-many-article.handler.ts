import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindManyArticlesQuery } from '../impl/find-many-article.query';
import ArticleRepository from '@app/learning/modules/article/domain/models/repositories/Article.repository';
import { BaseQueryHandler, LoggerService } from '@libs/shared';
import { Result, Ok } from 'oxide.ts';
import { FilterQuery } from 'mongoose';
import { ArticleDocument } from '@app/learning/modules/article/domain/models/schemas/Article.schema';
import { ENotFoundArticle } from '@app/learning/modules/article/domain/article.error';

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
    const conditions: FilterQuery<ArticleDocument> = {};
    if (query.listArticleDto.author) {
      conditions.author = query.listArticleDto.author;
    }
    if (query.listArticleDto.content) {
      conditions.$text = { $search: query.listArticleDto.content };
    }
    const data = await this.articleRepository.articleDocumentModel.find(
      conditions,
    );

    return Ok(data);
  }
}
