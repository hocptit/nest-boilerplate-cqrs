import {
  applyDecorators,
  Controller as NestController,
  Get as NestGet,
  Post as NestPost,
  Put as NestPut,
  Patch as NestPatch,
  Delete as NestDelete,
} from '@nestjs/common';
import { PropOptions } from '@nestjs/mongoose';
import {
  ApiProperty,
  ApiPropertyOptions,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { Prop as PropMongoose } from '@nestjs/mongoose';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function Prop(
  optionProp?: PropOptions,
  optionApiProperty?: ApiPropertyOptions,
) {
  return applyDecorators(
    PropMongoose(optionProp),
    ApiProperty(optionApiProperty),
  );
}

export function Controller(path: string) {
  return applyDecorators(NestController(path), ApiTags(path));
}

export function Get(
  path?: string | string[],
  options?: Partial<OperationObject>,
) {
  return applyDecorators(
    NestGet(path),
    ApiOperation(options ? options : { summary: 'Get a record' }),
  );
}

export function List(
  path?: string | string[],
  options?: Partial<OperationObject>,
) {
  return applyDecorators(
    NestGet(path),
    ApiOperation(options ? options : { summary: 'List records by condition' }),
  );
}

export function Post(
  path?: string | string[],
  options?: Partial<OperationObject>,
) {
  return applyDecorators(
    NestPost(path),
    ApiOperation(options ? options : { summary: 'Create record' }),
  );
}

export function Put(
  path?: string | string[],
  options?: Partial<OperationObject>,
) {
  return applyDecorators(
    NestPut(path),
    ApiOperation(options ? options : { summary: 'Edit record' }),
  );
}

export function Patch(
  path?: string | string[],
  options?: Partial<OperationObject>,
) {
  return applyDecorators(
    NestPatch(path),
    ApiOperation(options ? options : { summary: 'Edit record' }),
  );
}

export function Delete(
  path?: string | string[],
  options?: Partial<OperationObject>,
) {
  return applyDecorators(
    NestDelete(path),
    ApiOperation(options ? options : { summary: 'Delete record' }),
  );
}
