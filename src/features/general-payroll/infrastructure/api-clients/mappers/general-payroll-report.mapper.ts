import { PayrollReportEntity } from '../../../domain/entities/payroll-report.entity';
import { GeneralEntity } from '../../../domain/entities/general.entity';
import { DetailEntity } from '../../../domain/entities/detail.entity';
import { SignatureEntity } from '../../../domain/entities/signature.entity';

import { ReportSchemeDto } from '../../../application/dtos/generalPayrollReport/report-scheme.dto';
import { ReportHeaderDto } from '../../../application/dtos/generalPayrollReport/report-header.dto';
import { ReportBodyDto } from '../../../application/dtos/generalPayrollReport/report-body.dto';
import { ReportFooterDto } from '../../../application/dtos/generalPayrollReport/report-footer.dto';

import groupPayrollByOfficeAndEmployee from './detail-payroll-report.mapper';

export class GeneralPayrollReportMapper {
  public static toReportSchemeDto(reportEntity: PayrollReportEntity): ReportSchemeDto {
    const headers    = [];
    const bodies     = [];
    const footers    = [];

    for (const general of reportEntity.general) {
      headers.push(this.mapToReportHeader(general))
    }

    // CORRECCIÓN AQUÍ: Desestructuramos para obtener directamente el array interno
    const { officeGroups } = groupPayrollByOfficeAndEmployee(
      reportEntity.details.map((detail) => this.mapToReportBody(detail))
    )

    for (const officeGroup of officeGroups) {
      bodies.push(officeGroup)
    }

    for (const signature of reportEntity.signatures) {
      footers.push(this.mapToReportFooter(signature))
    }

    const reportScheme: ReportSchemeDto = {
      name: 'general-payroll-report',
      header: headers,
      body: bodies,
      footer: footers
    }

    return reportScheme
  }

  private static mapToReportHeader(general: GeneralEntity): ReportHeaderDto {
    return {
      conceptType: general.conceptType,
      conceptNumber: general.conceptNumber,
      conceptDenomination: general.conceptDenomination.trim(),
      assignment: general.assignment,
      deduction: general.deduction,
      visibleAmount: general.visibleAmount,
      amount: general.amount,
      deductible: general.deductible
    }
  }

  private static mapToReportBody(detail: DetailEntity): ReportBodyDto {
    return {
      payrollPeriodDate: detail.payrollPeriodDate,
      payrollIssueDate: detail.payrollIssueDate,
      periodCode: detail.periodCode,
      payrollTypeCode: detail.payrollTypeCode,
      officeCode: detail.officeCode,
      icpCode: detail.icpCode,
      denomination: detail.denomination.trim(),
      jobTitleDenomination: detail.jobTitleDenomination.trim(),
      idCard: detail.idCard,
      name: detail.name.trim(),
      accountNo: detail.accountNo,
      conceptNumber: detail.conceptNumber,
      conceptTransactionType: detail.conceptTransactionType,
      conceptDenomination: detail.conceptDenomination.trim(),
      conceptComplement: detail.conceptComplement ? detail.conceptComplement.trim() : null,
      percentage: detail.percentage,
      conceptType: detail.conceptType,
      amount: detail.amount,
      assignment: detail.assignment,
      deduction: detail.deduction,
      status: detail.status,
      statusDescription: detail.statusDescription.trim(),
      personCode: detail.personCode,
      hireDate: detail.hireDate,
      jobCode: detail.jobCode,
      bank: detail.bank.trim(),
      conceptCode: detail.conceptCode,
      module: detail.module,
      identifierCode: detail.identifierCode,
      salary: detail.salary
    }
  }

  private static mapToReportFooter(signature: SignatureEntity): ReportFooterDto {
    return {
      office: signature.office,
      order: signature.order,
      personCode: signature.personCode,
      name: signature.name.trim(),
      lastName: signature.lastName.trim(),
      idCard: signature.idCard,
      jobDescription: signature.jobDescription.trim()
    }
  }
}