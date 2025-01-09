import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from '../../../domain/repositories/auth.repository';
import { RefreshToken } from '../../../domain/entities/refresh-token.entity';
import { ResultValidationToken } from '../../../domain/interfaces/auth.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthAdapter extends AuthRepository {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {
    super();
  }

  async validateRefreshToken(refreshToken: RefreshToken): Promise<ResultValidationToken> {
    const apiAuthUrl = this.configService.get('api.ossmmasoft.authUrl')

    try {
      const result = await firstValueFrom(
        this.httpService.post<ResultValidationToken>(`${apiAuthUrl}/SisUsuarios/TokenValid`, { RefreshToken: refreshToken.value })
      )
      return result.data
    } catch (error) {
      console.error('Error al validar el refresh token:', error)
      return {
        data: false,
        isValid: false,
        linkData: null,
        linkDataArlternative: null,
        message: 'Error al validar el token',
        page: 0,
        totalPage: 0,
        cantidadRegistros: 0,
        total1: 0,
        total2: 0,
        total3: 0,
        total4: 0
      }
    }
  }
}