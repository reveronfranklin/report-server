import { Controller, Post, Body, StreamableFile, Header } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import blobStream from 'blob-stream';

import { DebitNoteThirdPartiesService } from '../../../application/services/debit-note-third-parties.service';
import { GenerateReportDto } from '../../../application/dtos/generate-report.dto';
import { CustomException } from '@exceptions/custom.exception';

@ApiTags('debit-note-third-parties')
@Controller('debit-note-third-parties')

export class DebitNoteThirdPartiesController {
  constructor(private debitNoteThirdPartiesService: DebitNoteThirdPartiesService) {}

  @Post('/pdf/report')
  @ApiOperation({ summary: 'Generate a PDF report for a Debit note to third parties' })
  @ApiResponse({ status: 200, description: 'Report generated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="report.pdf"')

  async generateReport(@Body() generateReportDto: GenerateReportDto): Promise<StreamableFile> {
    try {
      const stream      = blobStream()
      const pdfDocument = await this.debitNoteThirdPartiesService.generateReport(generateReportDto)

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
      throw new CustomException(`Error generating report DebitNoteThirdPartiesController -> ${error.message}`)
    }
  }
}