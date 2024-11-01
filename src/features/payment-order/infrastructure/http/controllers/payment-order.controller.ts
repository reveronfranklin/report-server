import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { PaymentOrderService } from '../../../application/services/payment-order.service';
import { GenerateReportDto } from '../dtos/generate-report.dto';

@ApiTags('payment-orders')
@Controller('payment-orders')
export class PaymentOrderController {
  constructor(private paymentOrderService: PaymentOrderService) {}

  @Post('/pdf/report')
  @ApiOperation({ summary: 'Generate a PDF report for a payment order' })
  @ApiResponse({ status: 200, description: 'Report generated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async generateReport(@Res() res: Response, @Body() generateReportDto: GenerateReportDto) {
    const result = await this.paymentOrderService.generateReport(generateReportDto.CodigoOrdenPago);
    res.status(200).json(result);
    //res.download(pdfPath);
  }
}