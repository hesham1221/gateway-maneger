import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { isIPv4 } from 'net';

@ValidatorConstraint({ async: false })
export class IsIPv4Constraint implements ValidatorConstraintInterface {
  validate(ip: string) {
    return typeof ip === 'string' && isIPv4(ip);
  }

  defaultMessage() {
    return 'Text ($value) is not a valid IPv4 address';
  }
}

export function IsIPv4(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsIPv4Constraint,
    });
  };
}
