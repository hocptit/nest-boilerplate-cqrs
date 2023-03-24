import { ListArticleDto } from '@app/modules/article/dtos/ListArticle.dto';
import { IQuery } from '@nestjs/cqrs';
import { BaseQuery } from '@libs/shared';

export class FindManyArticlesQuery extends BaseQuery implements IQuery {
  constructor(public listArticleDto: ListArticleDto) {
    super();
  }
}
