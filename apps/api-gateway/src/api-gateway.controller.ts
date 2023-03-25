import { Controller, Get } from '@nestjs/common';

import { ErrorConstant } from '@app/constants/error.constant';

import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly appService: ApiGatewayService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/error')
  getConstant() {
    return ErrorConstant;
  }
}
