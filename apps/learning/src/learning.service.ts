import { Injectable } from '@nestjs/common';
import {
  GetLearningRequest,
  GetLearningResponse,
} from '@assets/proto/learning/learning';

@Injectable()
export class LearningService {
  getLearning(request: GetLearningRequest): GetLearningResponse {
    return {
      message: `Hello ${request.name}`,
    };
  }
}
