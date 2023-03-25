import { Module } from '@nestjs/common';
import { LearningApiService } from '@app/modules/learning-api/learning-api.service';
import { LearningApiController } from '@app/modules/learning-api/learning-api.controller';
import { LearningModule } from '@libs/grpc-client/learning';

@Module({
  imports: [LearningModule],
  controllers: [LearningApiController],
  providers: [LearningApiService],
})
export class LearningApiModule {}
