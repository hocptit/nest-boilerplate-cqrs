import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  GetLearningResponse,
  LEARNING_PACKAGE_NAME,
  LEARNING_SERVICE_NAME,
  LearningServiceClient,
} from '@assets/proto/learning/learning';
import { ClientGrpc } from '@nestjs/microservices';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class LearningService implements OnModuleInit {
  private grpcLearning: LearningServiceClient;

  constructor(@Inject(LEARNING_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit(): void {
    this.grpcLearning = this.client.getService<LearningServiceClient>(
      LEARNING_SERVICE_NAME,
    );
  }

  getLearning(name: string): Promise<GetLearningResponse> {
    return lastValueFrom(
      this.grpcLearning.getLearning({ name }).pipe(
        map((response: GetLearningResponse) => response),
        catchError((error) => {
          // TODO: Handle error
          throw error;
        }),
      ),
    );
  }
}
