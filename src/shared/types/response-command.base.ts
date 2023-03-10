import { ApiProperty } from '@nestjs/swagger';
import { AggregateID } from '../cqrs/aggregate_root_base/aggregate-root.base';
export class BaseResponseCommand {
  @ApiProperty({ type: String })
  id: AggregateID;
}
