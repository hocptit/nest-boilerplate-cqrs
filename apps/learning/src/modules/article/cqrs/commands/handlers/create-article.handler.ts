import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../impl/create-article.command';
import ArticleRepository from '@app/learning/modules/article/domain/models/repositories/Article.repository';
import { LoggerService, BaseCommandHandler } from '@libs/shared';
import { Ok, Result } from 'oxide.ts';
import { ArticleDocument } from '@app/learning/modules/article/domain/models/schemas/Article.schema';

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
