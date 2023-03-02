import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../impl/create-article.command';
import ArticleRepository from 'models/repositories/Article.repository';
import { ArticleRoot } from '@modules/article/domain/aggregate_root/ArticleRoot';
import { LoggerService } from '@shared/modules/loggers/logger.service';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  implements ICommandHandler<CreateArticleCommand>
{
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly publisher: EventPublisher,
    private loggerService: LoggerService,
  ) {}
  private logger = this.loggerService.getLogger('template');
  async execute(command: CreateArticleCommand) {
    const { articleDto } = command;
    const articleCreated =
      await this.articleRepository.articleDocumentModel.create(articleDto);
    const articleRoot = new ArticleRoot(articleCreated._id).setData(
      articleCreated,
    );
    const article = this.publisher.mergeObjectContext(articleRoot);
    article.createdArticle();
    article.commit();
    return articleCreated;
  }
}
