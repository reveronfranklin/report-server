import { Injectable, NestMiddleware, UseInterceptors } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ApiResponseInterceptor } from '@interceptors/response.interceptor';
import { ResponseDto } from '@interceptors/response.dto';
import { AuthPort } from './ports/auth.port';
import { RefreshToken } from './interfaces';

@Injectable()
@UseInterceptors(ApiResponseInterceptor)
export class AuthMidleware implements NestMiddleware {
  constructor(private readonly authService: AuthPort) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const refreshTokenValue = req.headers['x-refresh-token'] as string;

    if (!refreshTokenValue) {
      const response = new ResponseDto<string>({
        data: null,
        isValid: false,
        message: 'No se proporcionó refresh token',
        page: 1,
        totalPage: 1,
        cantidadRegistros: 1,
        total1: 0,
        total2: 0,
        total3: 0,
        total4: 0,
      });

      return res.status(401).json(response);
    }

    const refreshToken: RefreshToken = {
      value: refreshTokenValue,
    };

    const results = await this.authService.validateRefreshToken(refreshToken);
    results.isValid = true;
    results.message = 'Refresh token validado';

    if (!results.isValid) {
      results.message = 'Refresh token inválido';
      return res.status(401).json(results);
    }

    req['tokenValidationResult'] = results;

    next();
  }
}
