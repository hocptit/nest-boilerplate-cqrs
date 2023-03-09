import { ArticleCreatedEventHandler } from './article-created.handler';
import { Provider } from '@nestjs/common';

export const EventHandlers: Provider[] = [ArticleCreatedEventHandler];
