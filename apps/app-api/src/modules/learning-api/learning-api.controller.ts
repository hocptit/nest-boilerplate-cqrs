import { Controller, Get } from '@libs/shared';
import { LearningApiService } from '@app/modules/learning-api/learning-api.service';
import { routesV1 } from '@app/app.routes';
import { Query, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('learning-api')
@UsePipes(new ValidationPipe())
export class LearningApiController {
  constructor(private readonly learningApiService: LearningApiService) {}

  @Get(routesV1.learning.getLearning.route, {
    summary: routesV1.learning.getLearning.summary,
  })
  getLearningApi(@Query('name') name: string) {
    return this.learningApiService.getLearning(name);
  }
}
