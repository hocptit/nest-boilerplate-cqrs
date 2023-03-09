import { CreateArticleHandler } from './create-article.handler';
import { SagaHandler } from './saga.handler';

export const CommandHandlers = [CreateArticleHandler, SagaHandler];
