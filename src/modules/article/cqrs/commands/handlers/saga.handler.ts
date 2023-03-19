import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import { CreateArticleCommand } from '../impl/create-article.command';
// import ArticleRepository from '@models/repositories/Article.repository';
// import { ArticleEntity } from '@models/schemas/ArticleRoot';
import { SagaCommand } from '../impl/saga.command';

@CommandHandler(SagaCommand)
export class SagaHandler implements ICommandHandler<SagaCommand> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_command: SagaCommand) {
    console.log('SagaHandler');
  }
}
