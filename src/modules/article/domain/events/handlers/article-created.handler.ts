import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { ArticleCreatedEvent } from '../impl/article-created.event';
import ArticleRepository from '@models/repositories/Article.repository';

@EventsHandler(ArticleCreatedEvent)
export class ArticleCreatedHandler
  implements IEventHandler<ArticleCreatedEvent>
{
  constructor(private readonly orderRepository: ArticleRepository) {}

  async handle(event: ArticleCreatedEvent) {
    console.log(event);
  }
}
