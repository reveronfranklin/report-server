import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from './application.exception';

export class BadRequestException extends ApplicationException {
  constructor(message: string = 'The request is not valid.') {
    super(message, HttpStatus.BAD_REQUEST)
  }
}