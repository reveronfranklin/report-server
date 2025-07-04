import { IsString } from 'class-validator';

export class ReportHeaderDto {
  @IsString()
  subTitle: string;
}