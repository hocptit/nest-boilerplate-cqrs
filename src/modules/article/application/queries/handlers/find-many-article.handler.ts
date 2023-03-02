import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindManyArticlesQuery } from '../impl/find-many-article.query';
import ArticleRepository from 'models/repositories/Article.repository';

@QueryHandler(FindManyArticlesQuery)
export class FindManyArticlesHandler
  implements IQueryHandler<FindManyArticlesQuery>
{
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(query: FindManyArticlesQuery) {
    return this.articleRepository.articleDocumentModel.find();
  }
}
