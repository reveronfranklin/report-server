import { IsNumber, IsString } from 'class-validator';

export class WithholdingDto {
  @IsString()
  description: string;

  @IsNumber()
  withheldAmount: number;
}