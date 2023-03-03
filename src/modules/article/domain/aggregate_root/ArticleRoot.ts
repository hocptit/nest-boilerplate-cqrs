import { ArticleCreatedEvent } from '@modules/article/application/events/impl/article-created.event';
import { BaseAggregateRoot } from '@shared/cqrs/aggregate_root_base/aggregate-root.base';
import { Article } from '@models/schemas/Article.schema';
export class ArticleRoot extends BaseAggregateRoot<Article> {
  createdArticle() {
    this.apply(new ArticleCreatedEvent(this.document));
  }
}
