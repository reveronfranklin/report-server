import { HttpException, HttpStatus } from '@nestjs/common';
import { IResponse } from '../interceptors/response.interface';

export class CustomException extends HttpException {
  constructor(message: string) {
    const response: IResponse<null> = {
      data: null,
      isValid: false,
      linkData: null,
      linkDataArlternative: null,
      message: `${message}`,
      page: 1,
      totalPage: 1,
      cantidadRegistros: 0,
      total1: 0,
      total2: 0,
      total3: 0,
      total4: 0,
    }

    super(response, HttpStatus.BAD_REQUEST)
  }
}