import { ArticleCreatedEvent } from '@app/modules/article/cqrs/events/impl/article-created.event';
import { BaseAggregateRoot } from '@libs/shared';
import { ObjectId } from 'mongoose';
import {
  ArticleDocument,
  ArticleSchema,
} from '@app/modules/article/domain/models/schemas/Article.schema';
import { CreateArticleDto } from '@app/modules/article/dtos/CreateArticle.dto';

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
