import { Body, Controller, Header, Post, StreamableFile } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import blobStream from 'blob-stream';

import { ExternalServiceException } from '@exceptions/external-service.exception';
import { PersonnelListService } from '../../../application/services/personnel-list.service';
import { ReportQueryApiDto } from '../../api-clients/dtos/report-query-api.dto';
import { ReportQueryMapper } from '../../api-clients/mappers/report-query.mapper';

@ApiTags('personnel-list')
@Controller('personnel-list')
export class PersonnelListController {
  constructor(private personnelListService: PersonnelListService) {}

  @Post('/pdf/report')
  @ApiOperation({ summary: 'Generate a PDF report for a personnel list' })
  @ApiResponse({ status: 200, description: 'Report generated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="reporte-personal.pdf"')
  async generateReport(@Body() reportQueryApiDto: ReportQueryApiDto): Promise<StreamableFile> {
    try {
      const reportQueryDto = ReportQueryMapper.toApplicationDto(reportQueryApiDto)
      const stream = blobStream()
      const pdfDocument = await this.personnelListService.generateReport(reportQueryDto)

      pdfDocument.pipe(stream)
      pdfDocument.end()

      const blob = await new Promise<Blob>((resolve) => {
        stream.on('finish', () => {
          resolve(stream.toBlob('application/pdf'))
        })
      })

      const arrayBuffer = await blob.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      return new StreamableFile(buffer)
    } catch (error) {
      console.error('Error generating report:', error)
      throw new ExternalServiceException(`Error generating report PersonnelListController -> ${error.message}`)
    }
  }
}
