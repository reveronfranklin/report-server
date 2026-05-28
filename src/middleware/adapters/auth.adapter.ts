import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { IResponse } from '@interceptors/response.interface';
import { AuthPort } from '../ports/auth.port';
import { RefreshToken } from '../interfaces';

@Injectable()
export class AuthAdapter extends AuthPort {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    super();
  }


  async validateRefreshToken(refreshToken: RefreshToken): Promise<IResponse<any>> {
    const apiAuthUrl = this.configService.get<string>('api.ossmmasoft.authUrl')

    try {
      const result = await firstValueFrom(
        this.httpService.post<IResponse<any>>(
            `${apiAuthUrl}/SisUsuarios/TokenValid`,
            { RefreshToken: refreshToken.value }
        )
      )

      return result.data
    } catch (error) {
      const axiosError    = error as AxiosError<IResponse<any>>;
      const errorMessage  = axiosError.response?.data?.message || 'Error al validar el token';

      console.error('Error al validar el refresh token en el adaptador:', axiosError.message);

      return {
        data: false,
        isValid: false,
        linkData: null,
        linkDataArlternative: null,
        message: errorMessage,
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