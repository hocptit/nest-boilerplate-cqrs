import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../impl/create-article.command';
import ArticleRepository from 'modules/article/domain/models/repositories/Article.repository';
import { ArticleEntity } from '@modules/article/domain/aggregate_root/ArticleEntity';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { BaseCommandHandler } from '@shared/cqrs/commands/command-handler.base';
import { ArticleDocument } from '../../../domain/models/schemas/Article.schema';

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
    const articleCreated: ArticleDocument =
      await this.articleRepository.articleDocumentModel.create(articleDto);
      const articleEntity = this.articleRepository.mapper.toDomain(articleCreated)
    this.logger.warn('This is log', 'GOOO');
    articleEntity.createdArticle();
    articleEntity.commit();
    return articleCreated;
  }
}
