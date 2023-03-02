import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { isEthereumAddress, IsString } from 'class-validator';
// import Web3 from 'web3';
import rawbody from 'raw-body';
import { createParamDecorator } from '@nestjs/common';

// export function IsWalletAddress() {
//   return applyDecorators(
//     IsString({ message: 'address must be an ethereum address' }),
//     Transform(({ value }) => {
//       try {
//         const checkSum = Web3.utils.toChecksumAddress(value);
//         return isEthereumAddress(checkSum) === true ? checkSum : null;
//       } catch {
//         return null;
//       }
//     }),
//   );
// }

export const PlainBody = createParamDecorator(async (data, context) => {
  const req = context.switchToHttp().getRequest();
  return req?.readable ? (await rawbody(req)).toString().trim() : null;
});
