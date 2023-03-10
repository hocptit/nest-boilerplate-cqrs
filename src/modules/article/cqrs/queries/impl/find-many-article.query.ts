import { ListArticleDto } from '@modules/article/dtos/ListArticle.dto';
import { IQuery } from '@nestjs/cqrs';
import { BaseQuery } from '@shared/cqrs/queries/query.base';

export class FindManyArticlesQuery extends BaseQuery implements IQuery {
  constructor(public listArticleDto: ListArticleDto) {
    super();
  }
}
