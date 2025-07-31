
import { PaymentBatchEntity } from '../../../../domain/entities/payment-batches.entity';
import { ReportSchemeDto } from '../../../../application/dtos/debitNoteThirdParties/report-scheme.dto';
import { ReportHeaderDto } from '../../../../application/dtos/debitNoteThirdParties/report-header.dto';
import { ReportBodyDto } from '../../../../application/dtos/debitNoteThirdParties/report-body.dto';

import { twoDigitFormatDate } from '@shared/utils';

export class ReportBatchesMapper {
  public static toReportSchemeDto(batches: PaymentBatchEntity[]): ReportSchemeDto {
    const headers   = []
    const bodies    = []

    for (const batch of batches) {
      headers.push(this.mapToReportHeader(batch))
    }

    for (const batch of batches) {
      bodies.push(this.mapToReportBody(batch))
    }

    const reportScheme: ReportSchemeDto = {
      name: 'report-batches',
      header: headers,
      body: bodies
    }

    return reportScheme
  }

  private static mapToReportHeader(batch: PaymentBatchEntity): ReportHeaderDto {
    return {
      accountNumber: batch.accountNumber,
      checkDate: twoDigitFormatDate(batch.checkDate),
      checkNumber: batch.checkNumber,
      name: batch.name.trim(),
      reportTitle: batch.reportTitle.trim().toUpperCase()
    }
  }

  private static mapToReportBody(batch: PaymentBatchEntity): ReportBodyDto {
    return {
      amount: batch.amount,
      opIcpPucAmount: batch.opIcpPucAmount,
      opIcpPucDetail: batch.opIcpPucDetail.trim(),
      payToTheOrderOf: batch.payToTheOrderOf.trim(),
      reason: batch.reason.trim(),
      taxWithholdingAmount: batch.taxWithholdingAmount
    }
  }
}