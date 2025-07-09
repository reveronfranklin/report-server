
import { PaymentBatchEntity } from '../../../domain/entities/payment-batches.entity';
import { ReportSchemeDto } from '../../../application/dtos/debitNoteThirdParties/report-scheme.dto';
import { ReportHeaderDto } from '../../../application/dtos/debitNoteThirdParties/report-header.dto';
import { ReportBodyDto } from '../../../application/dtos/debitNoteThirdParties/report-body.dto';

export class DebitNoteThirdPartiesMapper {
  public static toDomain(paymentBatch: any): ReportSchemeDto {
    const reportScheme: ReportSchemeDto = {
      name: 'debit-note-third-parties-report',
      header: this.mapToReportHeader(paymentBatch),
      body: this.mapToReportBody(paymentBatch)
    }

    return reportScheme
  }

  private static mapToReportHeader(paymentBatch: PaymentBatchEntity): ReportHeaderDto {
    return {
      accountNumber: paymentBatch.accountNumber,
      checkDate: paymentBatch.checkDate,
      checkNumber: paymentBatch.checkNumber,
      name: paymentBatch.name.trim()
    }
  }

  private static mapToReportBody(paymentBatch: PaymentBatchEntity): ReportBodyDto {
    return {
      amount: paymentBatch.amount,
      opIcpPucAmount: paymentBatch.opIcpPucAmount,
      opIcpPucDetail: paymentBatch.opIcpPucDetail.trim(),
      payToTheOrderOf: paymentBatch.payToTheOrderOf.trim(),
      reason: paymentBatch.reason.trim(),
      taxWithholdingAmount: paymentBatch.taxWithholdingAmount,
    }
  }
}