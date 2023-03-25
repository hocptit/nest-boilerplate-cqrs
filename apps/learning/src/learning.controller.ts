import { Controller } from '@nestjs/common';
import {
  GetLearningRequest,
  GetLearningResponse,
  LearningServiceController,
  LearningServiceControllerMethods,
} from '@assets/proto/learning/learning';
import { Observable } from 'rxjs';
import { LearningService } from '@app/learning/learning.service';
import { Get } from '@libs/shared';

@Controller('/learning')
@LearningServiceControllerMethods()
export class LearningController implements LearningServiceController {
  constructor(private readonly learningService: LearningService) {}

  @Get('/check-health')
  checkHealth(): Promise<any> {
    // todo: implement check health service
    return Promise.resolve({
      message: 'OK',
    });
  }

  getLearning(
    request: GetLearningRequest,
  ):
    | Promise<GetLearningResponse>
    | Observable<GetLearningResponse>
    | GetLearningResponse {
    return this.learningService.getLearning(request);
  }
  // YOLOFCC
}
