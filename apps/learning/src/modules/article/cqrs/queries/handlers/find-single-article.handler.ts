import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import ArticleRepository from '@app/learning/modules/article/domain/models/repositories/Article.repository';
import { Err, Ok, Result } from 'oxide.ts';
import { ENotFoundArticle } from '@app/learning/modules/article/domain/article.error';
import { FindSingleArticleQuery } from '@app/learning/modules/article/cqrs/queries/impl/find-single-article.query';
import { ArticleDocument } from '@app/learning/modules/article/domain/models/schemas/Article.schema';

@QueryHandler(FindSingleArticleQuery)
export class FindSingleArticleHandler
  implements IQueryHandler<FindSingleArticleQuery>
{
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(
    query: FindSingleArticleQuery,
  ): Promise<Result<ArticleDocument, ENotFoundArticle>> {
    const { id } = query;
    const article = await this.articleRepository.articleDocumentModel.findOne(
      new Types.ObjectId(id as any as string),
    );
    if (!article) {
      return Err(new ENotFoundArticle());
    }
    return Ok(article);
  }
}
