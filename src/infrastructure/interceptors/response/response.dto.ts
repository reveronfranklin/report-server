import { IsBoolean, IsNumber, IsString, IsOptional, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { IResponse } from './response.interface'

export class ResponseDto<T> implements IResponse<T> {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Object)
  data: T | null;

  /* consultar si las respuestas del data es boolean o no */

  @IsBoolean()
  isValid: boolean;

  @IsString()
  @IsOptional()
  linkData: string;

  @IsString()
  @IsOptional()
  linkDataArlternative: string;

  @IsString()
  message: string;

  @IsNumber()
  @Min(1)
  page: number;

  @IsNumber()
  @Min(1)
  totalPage: number;

  @IsNumber()
  @Min(0)
  cantidadRegistros: number;

  @IsNumber()
  total1: number;

  @IsNumber()
  total2: number;

  @IsNumber()
  total3: number;

  @IsNumber()
  total4: number;

  constructor(partial: Partial<IResponse<T>>) {
    Object.assign(this, partial);
  }
}