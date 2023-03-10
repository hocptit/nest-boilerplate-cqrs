import { ArticleCreatedEvent } from '@modules/article/cqrs/events/impl/article-created.event';
import { BaseAggregateRoot } from '@shared/cqrs/aggregate_root_base/aggregate-root.base';
import { ArticleDocument, ArticleSchema } from '../schemas/Article.schema';
import { ObjectId } from 'mongoose';
import { CreateArticleDto } from '../../../dtos/CreateArticle.dto';
export class ArticleEntity extends BaseAggregateRoot<
  ArticleSchema,
  ArticleDocument
> {
  constructor(id?: ObjectId, document?: ArticleDocument) {
    super(id, document);
  }
  createdArticle(dto: CreateArticleDto) {
    this.apply(new ArticleCreatedEvent(dto));
  }
}
