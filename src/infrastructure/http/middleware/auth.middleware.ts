import { Injectable, NestMiddleware, UseInterceptors } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthRepository } from '../../../domain/repositories/auth.repository';
import { RefreshToken } from '../../../domain/entities/refresh-token.entity';
import { ApiResponseInterceptor } from '../../../interceptors/response.interceptor';
import { ResponseDto } from '../../../interceptors/response.dto';

@Injectable()
@UseInterceptors(ApiResponseInterceptor)
export class AuthMiddleware implements NestMiddleware {
  constructor(private authRepository: AuthRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {
   /*  const refreshTokenValue = req.headers['x-refresh-token'] as string

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
        total4: 0
      })
      return res.status(401).json(response)
    }

    const refreshToken = new RefreshToken(refreshTokenValue);
    const results = await this.authRepository.validateRefreshToken(refreshToken)

    if (!results.isValid) {
      results.message = 'Refresh token inválido'
      return res.status(401).json(results)
    }

    req['tokenValidationResult'] = results */

    next()
  }
}