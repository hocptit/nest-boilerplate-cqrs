import { Module } from '@nestjs/common';
import { LearningController } from '@app/grpc/modules/learning/learning.controller';
import { LearningService } from '@app/grpc/modules/learning/learning.service';

@Module({
  imports: [],
  controllers: [LearningController],
  providers: [LearningService],
})
export class LearningModule {}
