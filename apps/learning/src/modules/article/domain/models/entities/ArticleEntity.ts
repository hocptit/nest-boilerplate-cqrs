import { ArticleCreatedEvent } from '@app/learning/modules/article/cqrs/events/impl/article-created.event';
import { BaseAggregateRoot } from '@libs/shared';
import { ObjectId } from 'mongoose';
import {
  ArticleDocument,
  ArticleSchema,
} from '@app/learning/modules/article/domain/models/schemas/Article.schema';
import { CreateArticleRequest } from '@assets/proto/learning/learning';

export class ArticleEntity extends BaseAggregateRoot<
  ArticleSchema,
  ArticleDocument
> {
  constructor(id?: ObjectId, document?: ArticleDocument) {
    super(id, document);
  }
  createdArticle(dto: CreateArticleRequest) {
    this.apply(new ArticleCreatedEvent(dto));
  }
}
