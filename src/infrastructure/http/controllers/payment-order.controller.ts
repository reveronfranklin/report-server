import { Controller, Post, Body, Res, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { PaymentOrderService } from '../../../application/services/payment-order.service';
import { GenerateReportDto } from '../dtos/generate-report.dto';
import { ApiResponseInterceptor } from '../../../shared/interceptors/response.interceptor';
import { ResponseDto } from '../../../shared/interceptors/response.dto';

@ApiTags('payment-orders')
@Controller('payment-orders')
@UseInterceptors(ApiResponseInterceptor)
export class PaymentOrderController {
  constructor(private paymentOrderService: PaymentOrderService) {}

  @Post('/pdf/report')
  @ApiOperation({ summary: 'Generate a PDF report for a payment order' })
  @ApiResponse({ status: 200, description: 'Report generated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })

  /* @Res() res: Response */

  async generateReport(@Res() res: Response, @Body() generateReportDto: GenerateReportDto): Promise<ResponseDto<string>> {
    try {
      const pdfDocument = await this.paymentOrderService.generateReport(generateReportDto.CodigoOrdenPago);

      // Set the response headers for PDF
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="report.pdf"');

      // Pipe the PDF document to the response
      pdfDocument.info.Title = 'test report';
      pdfDocument.pipe(res);
      pdfDocument.end();

      // Convert PDF document to a base64 string or buffer
      const pdfBuffer = pdfDocument.save(); // Assuming pdfDocument has a save method
      const pdfBase64 = pdfBuffer.toString();

      return new ResponseDto<string>({
        data: pdfBase64,
        isValid: true,
        message: 'PDF generated successfully',
        page: 1,
        totalPage: 1,
        cantidadRegistros: 1,
        total1: 0,
        total2: 0,
        total3: 0,
        total4: 0
      });
    } catch (error) {
      throw new Error('Error generating report: ' + error.message);
    }
  }
}