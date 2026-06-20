import {
  OfficeGroup,
  PayrollReportData,
  PayrollGeneralTotals
} from '../interfaces/detail-payroll-report.interface';
import { ReportBodyDto } from '../../../application/dtos/generalPayrollReport/report-body.dto';

const groupPayrollByOfficeAndEmployee = (
  details: ReportBodyDto[],
  payrollName: string = 'NÓMINA GENERAL',
  payrollPeriod: string = ''
): PayrollReportData => {
  const officeMap = new Map<string, OfficeGroup>();

  const generalTotals: PayrollGeneralTotals = {
    totalGeneralAssignment: 0,
    totalGeneralDeduction: 0,
    activeGeneralCount: 0,
    permissionGeneralCount: 0,
    sickLeaveGeneralCount: 0,
    vacationGeneralCount: 0,
  };

  details.forEach((item) => {
    if (!officeMap.has(item.officeCode)) {
      officeMap.set(item.officeCode, {
        officeCode: item.officeCode,
        officeDenomination: item.denomination,
        employees: [],
        totalOfficeAssignment: 0,
        totalOfficeDeduction: 0,
        activeEmployeesCount: 0,
        permissionEmployeesCount: 0,
        sickLeaveEmployeesCount: 0,
        vacationEmployeesCount: 0
      });
    }

    const office = officeMap.get(item.officeCode)!;
    let employee = office.employees.find(e => e.idCard === item.idCard);

    if (!employee) {
      employee = {
        idCard: item.idCard,
        name: item.name,
        jobTitleDenomination: item.jobTitleDenomination,
        bank: item.bank,
        hireDate: item.hireDate,
        personCode: item.personCode,
        accountNo: item.accountNo,
        salary: item.salary || null,
        status: item.status,
        statusDescription: item.statusDescription,
        concepts: [],
        totalEmployeeAssignment: 0,
        totalEmployeeDeduction: 0
      };

      office.employees.push(employee);

      if (item.active === 1) {
        office.activeEmployeesCount++;
        generalTotals.activeGeneralCount++;
      } else if (item.leave === 1) {
        office.permissionEmployeesCount++;
        generalTotals.permissionGeneralCount++;
      } else if (item.sickLeave === 1) {
        office.sickLeaveEmployeesCount++;
        generalTotals.sickLeaveGeneralCount++;
      } else if (item.vacation === 1) {
        office.vacationEmployeesCount++;
        generalTotals.vacationGeneralCount++;
      }
    }

    employee.concepts.push({
      conceptType: item.conceptType,
      conceptTransactionType: item.conceptTransactionType,
      conceptNumber: item.conceptNumber,
      percentage: item.percentage || null,
      conceptDenomination: item.conceptDenomination,
      conceptComplement: item.conceptComplement,
      assignment: item.assignment || 0,
      deduction: item.deduction || 0,
      generalAmount: null
    });

    const assignmentAmount = item.assignment || 0;
    const deductionAmount = item.deduction || 0;

    employee.totalEmployeeAssignment += assignmentAmount;
    employee.totalEmployeeDeduction  += deductionAmount;

    office.totalOfficeAssignment     += assignmentAmount;
    office.totalOfficeDeduction      += deductionAmount;

    generalTotals.totalGeneralAssignment += assignmentAmount;
    generalTotals.totalGeneralDeduction  += deductionAmount;
  });

  return {
    payrollName,
    payrollPeriod,
    officeGroups: Array.from(officeMap.values()),
    generalTotals
  }
}

export default groupPayrollByOfficeAndEmployee;