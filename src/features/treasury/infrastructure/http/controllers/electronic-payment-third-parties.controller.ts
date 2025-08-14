import { Controller, Post, Body, StreamableFile, Header } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import blobStream from 'blob-stream';

import { ExternalServiceException } from '@exceptions/external-service.exception';
import { ElectronicPaymentThirdPartiesService } from '../../../application/services/electronic-payment-third-parties.service';
import { ReportQueryApiDto  } from '../../api-clients/dtos/report-query-api.dto';
import { ReportQueryMapper  } from '../../api-clients/mappers/report-query.mapper';

@ApiTags('electronic-payment-third-parties')
@Controller('electronic-payment-third-parties')

export class ElectronicPaymentThirdPartiesController {
  constructor(private electronicPaymentThirdPartiesService: ElectronicPaymentThirdPartiesService) {}

  @Post('/pdf/report')
  @ApiOperation({ summary: 'Generate a PDF report for a batches' })
  @ApiResponse({ status: 200, description: 'Report generated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="report.pdf"')

  async generateReport(@Body() reportQueryApiDto: ReportQueryApiDto): Promise<StreamableFile> {
    try {
      const reportQueryDto  = ReportQueryMapper.toApplicationDto(reportQueryApiDto)
      const stream          = blobStream()
      const pdfDocument     = await this.electronicPaymentThirdPartiesService.generateReport(reportQueryDto)

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
      throw new ExternalServiceException(`Error generating report ElectronicPaymentThirdPartiesController -> ${error.message}`)
    }
  }
}