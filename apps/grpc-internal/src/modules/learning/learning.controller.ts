import { Controller } from '@nestjs/common';
import { LearningService } from '@app/grpc/modules/learning/learning.service';
import {
  GetLearningRequest,
  GetLearningResponse,
  LearningServiceController,
  LearningServiceControllerMethods,
} from '@assets/proto/learning/learning';
import { Observable } from 'rxjs';

@Controller('learning-api')
@LearningServiceControllerMethods()
export class LearningController implements LearningServiceController {
  constructor(private readonly learningService: LearningService) {}

  getLearning(
    request: GetLearningRequest,
  ):
    | Promise<GetLearningResponse>
    | Observable<GetLearningResponse>
    | GetLearningResponse {
    return this.learningService.getLearning(request);
  }
}
