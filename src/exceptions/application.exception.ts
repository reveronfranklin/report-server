import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class ApplicationException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    data: any = null
  ) {
    super({ message, data }, status)
  }
}