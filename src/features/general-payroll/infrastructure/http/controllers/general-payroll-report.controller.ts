import { Controller, Post, Body, StreamableFile, Header } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import blobStream from 'blob-stream';

import { GeneralPayrollReportService } from '../../../application/services/general-payroll.service';
import { ReportQueryApiDto } from '../../api-clients/dtos/report-query-api.dto';
import { ExternalServiceException } from '@exceptions/external-service.exception';

@ApiTags('general-payroll-report')
@Controller('general-payroll-report')
export class GeneralPayrollReportController {
  constructor(private readonly generalPayrollReportService: GeneralPayrollReportService) {}

  @Post('/pdf/report')
  @ApiOperation({ summary: 'Generate a PDF report for General Payroll' })
  @ApiResponse({ status: 200, description: 'Payroll report generated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Payroll report not found' })
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="general_payroll_report.pdf"')
  async generateReport(@Body() reportQueryApiDto: ReportQueryApiDto): Promise<StreamableFile> {
    try {
      const stream      = blobStream()
      const pdfDocument = await this.generalPayrollReportService.generateReport(reportQueryApiDto)

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
    } catch (error: any) {
      console.error('Error generating payroll report:', error)
      throw new ExternalServiceException(
        `Error generating report GeneralPayrollReportController -> ${error?.message}`
      )
    }
  }
}