import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { FindSingleArticleQuery } from '../impl/find-single-article.query';
import ArticleRepository from 'modules/article/domain/models/repositories/Article.repository';

@QueryHandler(FindSingleArticleQuery)
export class FindSingleArticleHandler
  implements IQueryHandler<FindSingleArticleQuery>
{
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(query: FindSingleArticleQuery) {
    const { id } = query;
    return this.articleRepository.articleDocumentModel.findOne(
      new Types.ObjectId(id),
    );
  }
}
