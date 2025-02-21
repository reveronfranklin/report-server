import { RefreshToken } from '../entities/refresh-token.entity';

export interface IAuth {
  validateRefreshToken(refreshToken: RefreshToken): Promise<ResultValidationToken>;
}

export interface ResultValidationToken {
  data: boolean;
  isValid: boolean;
  linkData: any | null;
  linkDataArlternative: any | null;
  message: string;
  page: number;
  totalPage: number;
  cantidadRegistros: number;
  total1: number;
  total2: number;
  total3: number;
  total4: number;
}