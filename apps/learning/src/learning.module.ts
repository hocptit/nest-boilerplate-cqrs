import { Module } from '@nestjs/common';
import { LearningController } from '@app/learning/learning.controller';
import { LearningService } from '@app/learning/learning.service';
import { MODULES } from '@app/learning/modules';

@Module({
  imports: [...MODULES],
  controllers: [LearningController],
  providers: [LearningService],
})
export class LearningModule {}
