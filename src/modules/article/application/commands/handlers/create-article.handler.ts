import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../impl/create-article.command';
import ArticleRepository from 'models/repositories/Article.repository';
import { ArticleRoot } from '@modules/article/domain/aggregate_root/ArticleRoot';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { BaseCommandHandler } from '@shared/cqrs/commands/command-handler.base';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  extends BaseCommandHandler
  implements ICommandHandler<CreateArticleCommand>
{
  constructor(
    protected readonly articleRepository: ArticleRepository,
    protected readonly publisher: EventPublisher,
    protected loggerService: LoggerService,
  ) {
    super(publisher, loggerService, CreateArticleHandler.name);
  }
  async execute(command: CreateArticleCommand) {
    const { articleDto } = command;
    const articleCreated =
      await this.articleRepository.articleDocumentModel.create(articleDto);
    const articleRoot = this.getAggregateRoot(
      new ArticleRoot(),
      articleCreated,
    );
    // this.logger.warn('This is log', 'GOOO');
    articleRoot.createdArticle();
    articleRoot.commit();
    return articleCreated;
  }
}
