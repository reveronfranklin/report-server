import { IsNumber, IsString, IsDate } from 'class-validator';

export class WithholdingDto {
  @IsNumber()
  operationNumber: number;

  @IsDate()
  invoiceDate: Date;

  @IsString()
  invoiceNumber: string;

  @IsNumber()
  invoiceControlNumber: number;

  @IsNumber()
  debitNoteNumber: number;

  @IsNumber()
  creditNoteNumber: number;

  @IsString()
  transactionType: string;

  @IsNumber()
  affectedInvoiceNumber: number;

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