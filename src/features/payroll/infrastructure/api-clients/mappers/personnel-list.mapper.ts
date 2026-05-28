import { IPersonnelListItemRaw } from '../../../domain/interfaces/personnel-list-item-raw.interface';
import { ReportDepartmentDto } from '../../../application/dtos/personnelList/report-department.dto';
import { ReportItemDto } from '../../../application/dtos/personnelList/report-item.dto';
import { ReportSchemeDto } from '../../../application/dtos/personnelList/report-scheme.dto';

export class PersonnelListMapper {
  static toReportSchemeDto(items: IPersonnelListItemRaw[]): ReportSchemeDto {
    const departments = this.groupByDepartment(items)
    const totalSalary = departments.reduce((total, department) => total + department.totalSalary, 0)
    const totalRecords = departments.reduce((total, department) => total + department.totalRecords, 0)
    const payrollType = this.resolvePayrollType(items)

    return {
      header: {
        title: 'REPORTE DE PERSONAL',
        issuedAt: new Date(),
        payrollType
      },
      body: {
        departments
      },
      summary: {
        totalSalary,
        totalRecords
      }
    }
  }

  private static groupByDepartment(items: IPersonnelListItemRaw[]): ReportDepartmentDto[] {
    const departments = new Map<string, ReportDepartmentDto>()

    for (const rawItem of items) {
      const departmentLabel = this.normalizeText(rawItem.departamento)
      const parsedDepartment = this.parseDepartment(departmentLabel)
      const key = departmentLabel || 'SIN_UNIDAD_EJECUTORA'
      const item = this.toReportItemDto(rawItem)

      if (!departments.has(key)) {
        departments.set(key, {
          code: parsedDepartment.code,
          name: parsedDepartment.name,
          label: parsedDepartment.label,
          items: [],
          totalSalary: 0,
          totalRecords: 0
        })
      }

      const department = departments.get(key)

      department.items.push(item)
      department.totalSalary += item.sueldo
      department.totalRecords += 1
    }

    return Array.from(departments.values())
  }

  private static toReportItemDto(rawItem: IPersonnelListItemRaw): ReportItemDto {
    return {
      cedula: this.normalizeText(rawItem.cedula),
      nombre: this.normalizeText(rawItem.nombre) || 'VACANTE',
      fechaIngreso: rawItem.fechaIngreso ?? null,
      codigo: this.normalizeText(rawItem.codigo),
      cargo: this.normalizeText(rawItem.cargo),
      sueldo: Number(rawItem.sueldo ?? 0),
      descripcionStatus: this.normalizeText(rawItem.descripcionStatus),
      tipoNomina: this.normalizeText(rawItem.tipoNomina)
    }
  }

  private static parseDepartment(department: string): { code: string; name: string; label: string } {
    if (!department) {
      return {
        code: '',
        name: 'SIN UNIDAD EJECUTORA',
        label: 'SIN UNIDAD EJECUTORA'
      }
    }

    const match = department.match(/^([\d-]+)\s+(.+)$/)

    if (!match) {
      return {
        code: '',
        name: department,
        label: department
      }
    }

    const code = match[1].trim()
    const name = match[2].trim()

    return {
      code,
      name,
      label: `${code}     ${name}`
    }
  }

  private static resolvePayrollType(items: IPersonnelListItemRaw[]): string {
    const itemWithPayrollType = items.find(item => this.normalizeText(item.tipoNomina))

    return this.normalizeText(itemWithPayrollType?.tipoNomina)
  }

  private static normalizeText(value: string | null | undefined): string {
    return `${value ?? ''}`.replace(/\s+/g, ' ').trim()
  }
}
