import { IsNumber, IsPositive, IsString, IsNotEmpty } from 'class-validator';

export class FundsDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNumber()
  @IsPositive()
  year: number;

  @IsNumber()
  @IsPositive()
  periodic: number;

  @IsString()
  @IsNotEmpty()
  financedDescription: string;

  @IsString()
  @IsNotEmpty()
  icpCodeConcat: string;

  @IsString()
  @IsNotEmpty()
  pucCodeConcat: string;
}