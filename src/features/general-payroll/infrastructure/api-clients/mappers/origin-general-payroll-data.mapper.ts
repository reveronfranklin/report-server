import { PayrollReportEntity } from '../../../domain/entities/payroll-report.entity';
import { GeneralEntity } from '../../../domain/entities/general.entity';
import { DetailEntity } from '../../../domain/entities/detail.entity';
import { SignatureEntity } from '../../../domain/entities/signature.entity';
import { PeriodEntity } from '../../../domain/entities/period.entity'; // 👈 Importado
import {
  IExternalPayrollData,
  IExternalGeneralConcept,
  IExternalPayrollDetail,
  IExternalSignature,
  IExternalPeriod
} from '../interfaces/payroll-external-response.interface';

export class OriginGeneralPayrollDataMapper {
  public static toDomainEntity(raw: IExternalPayrollData): PayrollReportEntity {
    return new PayrollReportEntity({
      period: this.toPeriodEntity(raw.periodo), // 👈 Mapeado en la entidad padre
      general: raw.general.map(element => this.toGeneralEntity(element)),
      details: raw.detalle.map(element => this.toDetailEntity(element)),
      signatures: raw.firma.map(element => this.toSignatureEntity(element))
    })
  }

  private static toPeriodEntity(raw: IExternalPeriod): PeriodEntity {
    return new PeriodEntity({
      periodCode: raw.codigoPeriodo,
      description: raw.descripcion,
      payrollTypeCode: raw.codigoTipoNomina,
      payrollTypeDescription: raw.descripcionTipoNomina,
      payrollDate: raw.fechaNomina,
      periodNumber: raw.periodo,
      periodDescription: raw.descripcionPeriodo,
      payrollCategory: raw.tipoNomina,
      payrollCategoryDescription: raw.tipoNominaDescripcion
    });
  }

  private static toGeneralEntity(raw: IExternalGeneralConcept): GeneralEntity {
    return new GeneralEntity({
      conceptType: raw.rTipoConcepto,
      conceptNumber: raw.rNumeroConcepto,
      conceptDenomination: raw.rDenominacionConcepto,
      assignment: raw.rAsignacion,
      deduction: raw.rDeduccion,
      visibleAmount: raw.rMontoVisible,
      amount: raw.rMonto,
      deductible: raw.rDeducible
    })
  }

  private static toDetailEntity(raw: IExternalPayrollDetail): DetailEntity {
    return new DetailEntity({
      payrollPeriodDate: raw.fechaPeriodoNomina,
      payrollIssueDate: raw.fechaEmisionNomina,
      periodCode: raw.codigoPeriodo,
      payrollTypeCode: raw.codigoTipoNomina,
      officeCode: raw.codigoOficina,
      icpCode: raw.codigoIcp,
      denomination: raw.denominacion,
      jobTitleDenomination: raw.denominacionCargo,
      idCard: raw.cedula,
      name: raw.nombre,
      accountNo: raw.noCuenta,
      conceptNumber: raw.numeroConcepto,
      conceptTransactionType: raw.tipoMovConcepto,
      conceptDenomination: raw.denominacionConcepto,
      conceptComplement: raw.complementoConcepto,
      percentage: raw.porcentaje,
      conceptType: raw.tipoConcepto,
      amount: raw.monto,
      assignment: raw.asignacion,
      deduction: raw.deduccion,
      status: raw.status,
      statusDescription: raw.descripcionStatus,
      personCode: raw.codigoPersona,
      hireDate: raw.fechaIngreso,
      jobCode: raw.cargoCodigo,
      bank: raw.banco,
      conceptCode: raw.codigoConcepto,
      module: raw.modulo || null,
      identifierCode: raw.codigoIdentificador || null,
      salary: raw.salario || null,
      active: raw.activos,
      leave: raw.permisos,
      vacation: raw.vacaciones,
      sickLeave: raw.reposos
    })
  }

  private static toSignatureEntity(raw: IExternalSignature): SignatureEntity {
    return new SignatureEntity({
      office: raw.oficina,
      officeDescription: raw.descripcionOficina,
      order: raw.orden,
      personCode: raw.codigoPersona,
      name: raw.nombre,
      lastName: raw.apellido,
      idCard: raw.cedula,
      jobDescription: raw.descripcionCargo
    })
  }
}