import { IResponse } from '@interceptors/response.interface';
import { Auth, RefreshToken } from '../interfaces';

export abstract class AuthPort implements Auth {
  abstract validateRefreshToken(refreshToken: RefreshToken): Promise<IResponse<any>>;
}