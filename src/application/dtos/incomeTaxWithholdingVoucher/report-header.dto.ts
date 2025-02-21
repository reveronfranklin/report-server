import { IsString } from 'class-validator';

export class ReportHeaderDto {
  @IsString()
  SUB_TITULO: string;
}