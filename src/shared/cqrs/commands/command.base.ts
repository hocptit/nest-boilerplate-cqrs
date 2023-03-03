import { RequestContextService } from 'infra/application/context/AppRequestContext';
import { v4 } from 'uuid';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type CommandProps<T> = Omit<T, 'id' | 'metadata'> & Partial<BaseCommand>;

export class CommandMetadata {
  /** ID for correlation purposes (for commands that
   *  arrive from other microservices,logs correlation, etc). */
  @IsString()
  @ApiProperty()
  @IsOptional()
  readonly correlationId: string;

  /**
   * Time when the command occurred. Mostly for tracing purposes
   */
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  readonly timestamp: number;
}

export class BaseCommand {
  /**
   * Command id, in case if we want to save it
   * for auditing purposes and create a correlation/causation chain
   */
  readonly id: string;

  readonly metadata: CommandMetadata;

  constructor(props: CommandProps<unknown>) {
    const ctx = RequestContextService.getContext();
    this.id = props.id || v4();
    this.metadata = {
      correlationId: props?.metadata?.correlationId || ctx.requestId,
      timestamp: props?.metadata?.timestamp || Date.now(),
    };
  }
}
