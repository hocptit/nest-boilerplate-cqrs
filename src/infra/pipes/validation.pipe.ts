import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { BadRequestException } from 'infra/exception';

export class BodyValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      skipMissingProperties: false,
      exceptionFactory: (errs: [ValidationError]) => {
        return new BadRequestException({
          message: `Validation errors on these fields: ${this.getMessageFromErrs(
            errs,
          )}`,
          statusCode: HttpStatus.BAD_REQUEST,
          validatorErrors: this.getPropertyAndContraints(errs),
        });
      },
    });
  }

  getMessageFromErrs(errs: ValidationError[], parent: string = null): string {
    return errs
      .map((e) => {
        const current = parent ? `${parent}.${e.property}` : `${e.property}`; //`${parent ? `${parent}.` : ''}${e.property}`;
        if (e.children && e.children.length > 0) {
          return `${this.getMessageFromErrs(e.children, current)}`;
        }
        return current;
      })
      .join(', ');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPropertyAndContraints(errs: ValidationError[]): any[] {
    const details = [];
    errs.forEach((e) => {
      if (e.children && e.children.length > 0) {
        this.getPropertyAndContraints(e.children).forEach((e) =>
          details.push(e),
        );
      } else {
        details.push({
          property: e.property,
          contraints: Object.values(e.constraints),
        });
      }
    });
    return details;
  }
}
