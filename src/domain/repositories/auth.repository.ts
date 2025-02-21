
import { IAuth, ResultValidationToken } from '../interfaces/auth.interface';
import { RefreshToken } from '../entities/refresh-token.entity';

export abstract class AuthRepository implements IAuth {
  abstract validateRefreshToken(refreshToken: RefreshToken): Promise<ResultValidationToken>;
}