import rawbody from 'raw-body';
import { createParamDecorator } from '@nestjs/common';

export const PlainBody = createParamDecorator(async (data, context) => {
  const req = context.switchToHttp().getRequest();
  return req?.readable ? (await rawbody(req)).toString().trim() : null;
});
