import { IsString, IsNotEmpty } from 'class-validator';

export class ReportSubHeaderDto {
  @IsString()
  @IsNotEmpty()
  nameWithholdingAgent: string;

  @IsString()
  @IsNotEmpty()
  withholdingAgentRif: string;

  @IsString()
  @IsNotEmpty()
  taxpayerName: string;

  @IsString()
  @IsNotEmpty()
  taxpayerRifNumber: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}