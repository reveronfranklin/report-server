import { Controller, Post, Body, UseInterceptors, StreamableFile, Header } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentOrderService } from '../../../application/services/payment-order.service';
import { GenerateReportDto } from '../dtos/generate-report.dto';
import { ApiResponseInterceptor } from '../../interceptors/response/response.interceptor';
import blobStream from 'blob-stream';

@ApiTags('payment-orders')
@Controller('payment-orders')
@UseInterceptors(ApiResponseInterceptor)
export class PaymentOrderController {
  constructor(private paymentOrderService: PaymentOrderService) {}

  @Post('/pdf/report')
  @ApiOperation({ summary: 'Generate a PDF report for a payment order' })
  @ApiResponse({ status: 200, description: 'Report generated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="report.pdf"')
  async generateReport(@Body() generateReportDto: GenerateReportDto): Promise<StreamableFile> {
    try {
      const pdfDocument = await this.paymentOrderService.generateReport(generateReportDto.CodigoOrdenPago);

      // Create a blob stream
      const stream = blobStream();

      // Pipe the PDF document to the blob stream
      pdfDocument.pipe(stream);

      // End the document
      pdfDocument.end();

      // Get the blob from the stream
      const blob = await new Promise<Blob>((resolve) => {
        stream.on('finish', () => {
          resolve(stream.toBlob('application/pdf'));
        });
      });

      // Convert blob to buffer
      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Return a StreamableFile
      return new StreamableFile(buffer);
    } catch (error) {
      console.error('Error generating report:', error);
      throw new Error('Error generating report: ' + error.message);
    }
  }
}