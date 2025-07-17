
import { PaymentBatchEntity } from '../../../domain/entities/payment-batches.entity';
import { ReportSchemeDto } from '../../../application/dtos/debitNoteThirdParties/report-scheme.dto';
import { ReportHeaderDto } from '../../../application/dtos/debitNoteThirdParties/report-header.dto';
import { ReportBodyDto } from '../../../application/dtos/debitNoteThirdParties/report-body.dto';

import { twoDigitFormatDate } from '@shared/utils';

export class DebitNoteThirdPartiesMapper {
  public static toDomain(paymentBatchs: PaymentBatchEntity[]): ReportSchemeDto {
    const headers   = []
    const bodies    = []

    for (const paymentBatch of paymentBatchs) {
      headers.push(this.mapToReportHeader(paymentBatch))
    }

    for (const paymentBatch of paymentBatchs) {
      bodies.push(this.mapToReportBody(paymentBatch))
    }

    const reportScheme: ReportSchemeDto = {
      name: 'debit-note-third-parties-report',
      header: headers,
      body: bodies
    }

    return reportScheme
  }

  private static mapToReportHeader(paymentBatch: PaymentBatchEntity): ReportHeaderDto {
    return {
      accountNumber: paymentBatch.accountNumber,
      checkDate: twoDigitFormatDate(paymentBatch.checkDate),
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