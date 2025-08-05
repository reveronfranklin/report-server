import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { IResponse } from '@interceptors/response.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx       = host.switchToHttp()
    const response  = ctx.getResponse<Response>()

    let status      = HttpStatus.INTERNAL_SERVER_ERROR
    let message     = 'Ocurrió un error inesperado.'
    let data: any   = null

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse()

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        message = (exceptionResponse as any).message || message
        data    = (exceptionResponse as any).data || null
      } else {
        message = exceptionResponse as string
      }
    }

    const errorResponse: IResponse<any> = {
      data: data,
      isValid: false,
      linkData: '',
      linkDataArlternative: '',
      message: message,
      page: 1,
      totalPage: 1,
      cantidadRegistros: 0,
      total1: 0,
      total2: 0,
      total3: 0,
      total4: 0
    }

    response.status(status).json(errorResponse)
  }
}