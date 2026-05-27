import { OfficeGroup } from '../interfaces/detail-payroll-report.interface';
import { ReportBodyDto } from '../../../application/dtos/generalPayrollReport/report-body.dto';

const groupPayrollByOfficeAndEmployee = (details: ReportBodyDto[]): OfficeGroup[] => {
  const officeMap = new Map<string, OfficeGroup>()

  details.forEach((item) => {
    if (!officeMap.has(item.officeCode)) {
      officeMap.set(item.officeCode, {
        officeCode: item.officeCode,
        officeDenomination: item.denomination,
        employees: [],
        totalOfficeAssignment: 0,
        totalOfficeDeduction: 0
      })
    }

    const office = officeMap.get(item.officeCode)!
    let employee = office.employees.find(e => e.idCard === item.idCard)

    if (!employee) {
      employee = {
        idCard: item.idCard,
        name: item.name,
        jobTitleDenomination: item.jobTitleDenomination,
        bank: item.bank,
        hireDate: item.hireDate,
        personCode: item.personCode,
        accountNo: item.accountNo,
        salary: null,
        concepts: [],
        totalEmployeeAssignment: 0,
        totalEmployeeDeduction: 0
      };

      office.employees.push(employee)
    }

    employee.concepts.push({
      conceptType: item.conceptType,
      conceptNumber: item.conceptNumber,
      percentage: item.percentage || null,
      conceptDenomination: item.conceptDenomination,
      conceptComplement: item.conceptComplement,
      assignment: item.assignment || 0,
      deduction: item.deduction || 0,
      generalAmount: null
    })

    employee.totalEmployeeAssignment += item.assignment || 0
    employee.totalEmployeeDeduction  += item.deduction || 0

    office.totalOfficeAssignment     += item.assignment || 0
    office.totalOfficeDeduction      += item.deduction || 0
  });

  return Array.from(officeMap.values())
}

export default groupPayrollByOfficeAndEmployee;