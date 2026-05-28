import { IPersonnelListItemRaw } from './personnel-list-item-raw.interface';

export interface IPersonnelListApiResponse {
  data: IPersonnelListItemRaw[];
  isValid: boolean;
  message: string;
  cantidadRegistros: number;
}
