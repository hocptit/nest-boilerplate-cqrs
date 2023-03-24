import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { ArticleCreatedEvent } from '../impl/article-created.event';
import ArticleRepository from '@app/modules/article/domain/models/repositories/Article.repository';
import { BaseEventHandler, LoggerService } from '@libs/shared';

@EventsHandler(ArticleCreatedEvent)
export class ArticleCreatedEventHandler
  extends BaseEventHandler
  implements IEventHandler<ArticleCreatedEvent>
{
  constructor(
    private readonly articleRepository: ArticleRepository,
    protected loggerService: LoggerService,
  ) {
    super(loggerService, ArticleCreatedEventHandler.name);
  }

  async handle(event: ArticleCreatedEvent) {
    console.log(event);
    this.logger.info('ArticleCreatedEventHandler');
  }
}
