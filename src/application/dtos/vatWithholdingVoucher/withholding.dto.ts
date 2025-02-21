import { IsNumber, IsString, IsDate } from 'class-validator';

export class WithholdingDto {
  @IsNumber()
  operationNumber: number;

  @IsDate()
  invoiceDate: Date;

  @IsString()
  invoiceNumber: string;

  @IsString()
  invoiceControlNumber: string;

  @IsString()
  debitNoteNumber: string;

  @IsString()
  creditNoteNumber: string;

  @IsString()
  transactionType: string;

  @IsString()
  affectedInvoiceNumber: string;

  @IsNumber()
  totalPurchasesIncludingVat: number;

  @IsNumber()
  purchasesWithoutVatCredit: number;

  @IsNumber()
  taxableIncome: number;

  @IsString()
  alicuota: string;

  @IsNumber()
  vatTax: number;

  @IsNumber()
  vatWithheld: number;
}