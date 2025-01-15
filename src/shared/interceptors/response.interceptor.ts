import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from './response.dto';
import { StreamableFile } from '@nestjs/common';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (data instanceof ResponseDto) {
          return data;
        }
        // Si la respuesta es un StreamableFile, devuélvelo directamente
        if (data instanceof StreamableFile) {
          return data;
        }

        return new ResponseDto({
          data,
          isValid: true,
          linkData: '',
          linkDataArlternative: '',
          message: 'Operation successful',
          page: 1,
          totalPage: 1,
          cantidadRegistros: Array.isArray(data) ? data.length : 1,
          total1: 0,
          total2: 0,
          total3: 0,
          total4: 0
        });
      })
    );
  }
}