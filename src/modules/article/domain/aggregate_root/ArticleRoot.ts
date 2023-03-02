import { ArticleCreatedEvent } from '@modules/article/domain/events/impl/article-created.event';
import { BaseAggregateRoot } from '@shared/cqrs/aggregate_root_base/BaseAggregateRoot';
import { Article } from '@models/schemas/Article.schema';
export class ArticleRoot extends BaseAggregateRoot<Article> {
  createdArticle() {
    this.apply(new ArticleCreatedEvent(this.document));
  }
}
