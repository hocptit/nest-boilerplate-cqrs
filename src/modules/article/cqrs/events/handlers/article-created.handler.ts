import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { ArticleCreatedEvent } from '../impl/article-created.event';
import ArticleRepository from '@modules/article/domain/models/repositories/Article.repository';
import { BaseEventHandler } from '../../../../../shared/cqrs/events/event-handler.base';
import { LoggerService } from '@shared/modules/loggers/logger.service';

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
