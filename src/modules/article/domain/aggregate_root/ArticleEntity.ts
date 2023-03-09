import { ArticleCreatedEvent } from '@modules/article/cqrs/events/impl/article-created.event';
import { BaseAggregateRoot } from '@shared/cqrs/aggregate_root_base/aggregate-root.base';
import { ArticleDocument } from '../models/schemas/Article.schema';
export class ArticleEntity extends BaseAggregateRoot<ArticleDocument> {
  // todo: implement function

  createdArticle() {
    this.apply(new ArticleCreatedEvent(this.document));
  }
}
