import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from './application.exception';

export class NotFoundException extends ApplicationException {
  constructor(message: string = 'Resource not found.') {
    super(message, HttpStatus.NOT_FOUND)
  }
}