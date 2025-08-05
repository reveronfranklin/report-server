import { Controller, Post, Body, StreamableFile, Header } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import blobStream from 'blob-stream';

import { VatWithholdingVoucherService } from '../../../application/services/vat-withholding-voucher.service';
import { GenerateReportDto } from '../../../application/dtos/generate-report.dto';
import { ExternalServiceException } from '@exceptions/external-service.exception';

@ApiTags('vat-withholding-voucher')
@Controller('vat-withholding-voucher')
export class VatWithholdingVoucherController {
  constructor(private vatWithholdingVoucherService: VatWithholdingVoucherService) {}

  @Post('/pdf/report')
  @ApiOperation({ summary: 'Generate a PDF report for a voucher IVA' })
  @ApiResponse({ status: 200, description: 'Report generated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="report.pdf"')
  async generateReport(@Body() generateReportDto: GenerateReportDto): Promise<StreamableFile> {
    try {
      const stream    = blobStream()
      const pdfDocument = await this.vatWithholdingVoucherService.generateReport(generateReportDto.CodigoOrdenPago)

      pdfDocument.pipe(stream)
      pdfDocument.end()

      const blob = await new Promise<Blob>((resolve) => {
        stream.on('finish', () => {
          resolve(stream.toBlob('application/pdf'))
        });
      });

      const arrayBuffer = await blob.arrayBuffer()
      const buffer      = Buffer.from(arrayBuffer)

      return new StreamableFile(buffer)
    } catch (error) {
      console.error('Error generating report:', error)
      throw new ExternalServiceException(`Error generating report vatWithholdingVoucherController -> ${error.message}`)
    }
  }
}