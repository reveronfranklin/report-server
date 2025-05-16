import { IsNumber, IsString } from 'class-validator';

export class WithholdingDto {
  @IsString()
  invoiceControlNumber: string;

  @IsString()
  invoiceNumber: string;

  @IsNumber()
  documentAmount: number;
}