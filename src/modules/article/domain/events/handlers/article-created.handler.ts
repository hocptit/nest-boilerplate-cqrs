import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { ArticleCreatedEvent } from '../impl/article-created.event';
import ArticleRepository from '@models/repositories/Article.repository';
import { RequestContextService } from 'infra/application/context/AppRequestContext';

@EventsHandler(ArticleCreatedEvent)
export class ArticleCreatedHandler
  implements IEventHandler<ArticleCreatedEvent>
{
  constructor(private readonly articleRepository: ArticleRepository) {}

  async handle(event: ArticleCreatedEvent) {
  }
}
