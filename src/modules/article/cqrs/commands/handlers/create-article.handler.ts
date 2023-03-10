import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../impl/create-article.command';
import ArticleRepository from 'modules/article/domain/models/repositories/Article.repository';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { BaseCommandHandler } from '@shared/cqrs/commands/command-handler.base';
import { ArticleDocument } from '../../../domain/models/schemas/Article.schema';
import { Ok, Result } from 'oxide.ts';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  extends BaseCommandHandler
  implements ICommandHandler<CreateArticleCommand>
{
  constructor(
    protected readonly articleRepository: ArticleRepository,
    protected loggerService: LoggerService,
  ) {
    super(loggerService, CreateArticleHandler.name);
  }
  async execute(command: CreateArticleCommand): Promise<Result<string, Error>> {
    const { articleDto } = command;
    const articleCreated: ArticleDocument =
      await this.articleRepository.articleDocumentModel.create(articleDto);
    const articleEntity =
      this.articleRepository.mapper.toDomain(articleCreated);
    articleEntity.createdArticle(articleDto);
    articleEntity.commit();
    return Ok(articleCreated._id);
  }
}
