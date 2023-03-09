import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ArticleCreatedEvent } from '../events/impl/article-created.event';
import { SagaCommand } from '../commands/impl/saga.command';

@Injectable()
export class ArticleSagas {
  @Saga()
  dragonKilled = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ArticleCreatedEvent),
      delay(1000),
      map((event) => {
        return new SagaCommand(event.articleDto);
      }),
    );
  };
}
