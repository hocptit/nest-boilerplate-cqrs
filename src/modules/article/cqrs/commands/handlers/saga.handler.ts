import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import { CreateArticleCommand } from '../impl/create-article.command';
// import ArticleRepository from '@models/repositories/Article.repository';
// import { ArticleEntity } from '@models/schemas/ArticleRoot';
import { SagaCommand } from '../impl/saga.command';

@CommandHandler(SagaCommand)
export class SagaHandler implements ICommandHandler<SagaCommand> {
  constructor() {} // private readonly publisher: EventPublisher, // private readonly articleRepository: ArticleRepository,

  async execute(command: SagaCommand) {}
}
