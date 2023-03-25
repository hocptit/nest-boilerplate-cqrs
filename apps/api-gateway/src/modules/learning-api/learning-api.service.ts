import { Injectable } from '@nestjs/common';
import { GetLearningResponse } from '@assets/proto/learning/learning';
import { LearningService } from '@libs/grpc-client/learning';

@Injectable()
export class LearningApiService {
  constructor(private readonly grpcLearning: LearningService) {}

  getLearning(name: string): Promise<GetLearningResponse> {
    return this.grpcLearning.getLearning(name);
  }
}
