import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from './application.exception';

export class ExternalServiceException extends ApplicationException {
  constructor(
    serviceName: string,
    message: string = `Error communicating with the service ${serviceName}.`,
    data: any = null
  ) {
    super(message, HttpStatus.SERVICE_UNAVAILABLE, data)
  }
}