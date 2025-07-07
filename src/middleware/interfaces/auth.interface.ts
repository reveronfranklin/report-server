import { IResponse } from '@interceptors/response.interface';
import { RefreshToken } from '../interfaces';

export interface Auth {
  validateRefreshToken(refreshToken: RefreshToken): Promise<IResponse<any>>;
}