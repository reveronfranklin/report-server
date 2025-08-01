import { Controller, Post, Body, StreamableFile, Header } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import blobStream from 'blob-stream';

import { ExternalServiceException } from '@exceptions/external-service.exception';
import { ReportBatchesService } from '../../../application/services/report-batches.service';
import { BatchReportQueryDto } from '../../../application/dtos/batch-report-query.dto';

@ApiTags('batches')
@Controller('batches')

export class ReportBatchesController {
  constructor(private reportBatchesService: ReportBatchesService) {}

  @Post('/pdf/report')
  @ApiOperation({ summary: 'Generate a PDF report for a batches' })
  @ApiResponse({ status: 200, description: 'Report generated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="report.pdf"')

  async generateReport(@Body() batchReportQueryDto: BatchReportQueryDto): Promise<StreamableFile> {
    try {
      const stream      = blobStream()
      const pdfDocument = await this.reportBatchesService.generateReport(batchReportQueryDto)

      pdfDocument.pipe(stream)
      pdfDocument.end()

      const blob = await new Promise<Blob>((resolve) => {
        stream.on('finish', () => {
          resolve(stream.toBlob('application/pdf'))
        })
      })

      const arrayBuffer = await blob.arrayBuffer()
      const buffer      = Buffer.from(arrayBuffer)

      return new StreamableFile(buffer)
    } catch (error) {
      console.error('Error generating report:', error)
      throw new ExternalServiceException(`Error generating report ReportBatchesController -> ${error.message}`)
    }
  }
}