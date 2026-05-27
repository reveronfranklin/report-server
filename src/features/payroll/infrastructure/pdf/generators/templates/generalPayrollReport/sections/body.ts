import type { Content, TableCell } from 'pdfmake/interfaces';
import { getCleanTableLayout } from '../../../components/layout/clean-table.layout';

/* Utils */
import {
  formatPrice,
  castRowSpans,
  moventTypeOptions
} from '@shared/utils';

const noHorizontalBorders       = [false, false, false, false];
const bodersWithHorizontalLines = [false, false, false, true];

const buildConceptRows = (employee: any): TableCell[][] => {
  const tableConcept: TableCell[][] = [];

  // ROWS -> HEADER: INFO CONCEPTS
  const conceptHeaderRow: TableCell[] = [
    { text: 'TIPO', style: 'titleBodyVariant', colSpan: 1 },
    { text: 'N°', style: 'titleBody', colSpan: 1 },
    { text: '%', style: 'titleBody', colSpan: 1 },
    { text: 'CONCEPTO', style: 'titleBodyVariant', colSpan: 3 }, ...castRowSpans(2),
    { text: 'COMPLEMENTO', style: 'titleBodyVariant', colSpan: 2 }, ...castRowSpans(1),
    { text: 'ASIGNACIONES', style: 'titleBody', colSpan: 1 },
    { text: 'DEDUCCIONES', style: 'titleBody', colSpan: 1 },
    { text: 'ACUMULADOS', style: 'titleBody', colSpan: 2 }, ...castRowSpans(1)
  ]

  tableConcept.push(conceptHeaderRow)

  let totalAssignment = 0
  let totalDeduction  = 0

  employee.concepts.forEach((concept: any) => {
    totalAssignment += concept.assignment || 0
    totalDeduction  += concept.deduction || 0

    const conceptDescriptionRow: TableCell[] = [
      { text: `${moventTypeOptions[concept.conceptType]}` || '', style: 'descriptionBodyVariant', colSpan: 1, border: noHorizontalBorders },
      { text: concept.conceptNumber || '', style: 'descriptionBody', colSpan: 1, border: noHorizontalBorders },
      { text: concept.percentage?.toString() || null, style: 'descriptionBody', colSpan: 1, border: noHorizontalBorders },
      { text: concept.conceptDenomination.toUpperCase(), style: 'descriptionBodyVariant', colSpan: 3, border: noHorizontalBorders },
      ...castRowSpans(2),
      { text: concept.conceptComplement || '', style: 'descriptionBodyVariant', colSpan: 2, border: noHorizontalBorders },
      ...castRowSpans(1),
      { text: concept.assignment > 0 ? formatPrice(concept.assignment) : '', style: 'descriptionBodyAmount', colSpan: 1, border: noHorizontalBorders },
      { text: concept.deduction > 0 ? formatPrice(concept.deduction) : '', style: 'descriptionBodyAmount', colSpan: 1, border: noHorizontalBorders },
      { text: '', style: 'descriptionBodyAmount', colSpan: 2, border: noHorizontalBorders },
      ...castRowSpans(1)
    ]

    tableConcept.push(conceptDescriptionRow)
  })

  // ROWS -> FOOTER: TOTALS CONCEPTS
  const conceptTotalRow: TableCell[] = [
    { text: 'TOTALES:', style: 'titleBodyWithoutFill', colSpan: 8},
    ...castRowSpans(7),
    {
      text: totalAssignment > 0 ? formatPrice(totalAssignment) : '0,00',
      style: 'titleBodyAmount',
      colSpan: 1
    },
    {
      text: totalDeduction > 0 ? formatPrice(totalDeduction) : '0,00',
      style: 'titleBodyAmount',
      colSpan: 1
    },
    { text: '', style: 'descriptionBodyAmount', colSpan: 2 },
    ...castRowSpans(1)
  ]

  tableConcept.push(conceptTotalRow)

  // ROWS -> FOOTER: NET TO PAY
  const netToPay = totalAssignment - totalDeduction;

  const netPayRow: TableCell[] = [
    { text: 'NETO A COBRAR:', style: 'titleBodyWithoutFill', colSpan: 9 },
    ...castRowSpans(8),
    {
      text: formatPrice(netToPay),
      style: 'titleBodyAmount',
      colSpan: 1
    },
    { text: '', style: 'descriptionBodyAmount', colSpan: 2 },
    ...castRowSpans(1)
  ]

  tableConcept.push(netPayRow)

  return tableConcept
}


const buildEmployeeRows = (employee: any): TableCell[][] => {
  const tableEmployee: TableCell[][] = []

  // ROWS -> HEADER: INFO EMPLOYEES
  const employeeHeaderRow: TableCell[] = [
    { text: 'CÉDULA', style: 'titleBody', colSpan: 1 },
    { text: 'NOMBRE Y APELLIDO', style: 'titleBody', colSpan: 3 }, ...castRowSpans(2),
    { text: 'CARGO', style: 'titleBody', colSpan: 2 }, ...castRowSpans(1),
    { text: 'CÓDIGO', style: 'titleBody', colSpan: 1 },
    { text: 'INGRESO', style: 'titleBody', colSpan: 1 },
    { text: 'SUELDO', style: 'titleBodyAmount', colSpan: 1 },
    { text: 'BANCO', style: 'titleBody', colSpan: 1 },
    { text: 'Nº DE CUENTA', style: 'titleBody', colSpan: 2 }, ...castRowSpans(1)
  ]

  // ROWS -> DESCRIPTION: INFO EMPLOYEES
  const employeeDescriptionRow: TableCell[] = [
    { text: employee.idCard, style: 'descriptionBody', colSpan: 1 },
    { text: employee.name.toUpperCase(), style: 'descriptionBody', colSpan: 3 }, ...castRowSpans(2),
    { text: employee.jobTitleDenomination.toUpperCase(), style: 'descriptionBody', colSpan: 2 }, ...castRowSpans(1),
    { text: employee.personCode, style: 'descriptionBody', colSpan: 1 },
    { text: employee.hireDate ? employee.hireDate.split('T')[0] : '', style: 'descriptionBody', colSpan: 1 },
    { text: employee.salary ? formatPrice(employee.salary) : '0,00', style: 'descriptionBodyAmount', colSpan: 1 },
    { text: employee.bank, style: 'descriptionBody', colSpan: 1 },
    { text: employee.accountNo, style: 'descriptionBody', colSpan: 2 }, ...castRowSpans(1)
  ]

  // ROWS -> SEPARATOR
  const employeeSeparatorRow: TableCell[] = [
    { text: null, colSpan: 12 },
    ...castRowSpans(11)
  ]

  tableEmployee.push(employeeHeaderRow)
  tableEmployee.push(employeeDescriptionRow)
  tableEmployee.push(employeeSeparatorRow)

  // TABLE -> CONCEPTS
  tableEmployee.push(...buildConceptRows(employee))

  return tableEmployee
}

const buildOfficeTotalRows = (office: any): TableCell[][] => {
  const totalOfficeNet = office.totalOfficeAssignment - office.totalOfficeDeduction

  const activeCount     = office.activeEmployeesCount ?? office.employees?.length ?? 0
  const permissionCount = office.permissionEmployeesCount ?? 0
  const sickLeaveCount  = office.sickLeaveEmployeesCount ?? 0
  const vacationCount   = office.vacationEmployeesCount ?? 0

  return [
    // Fila 1: Personal Activo | Total Asignaciones
    [
      { text: 'Personal Activo', style: 'titleBodyWithoutFill', colSpan: 4, border: noHorizontalBorders },
      ...castRowSpans(3),
      { text: activeCount.toString(), style: 'titleBodyAmount', colSpan: 1, border: noHorizontalBorders },
      { text: `Total Asignaciones: ${office.officeCode}`, style: 'titleBodyWithoutFill', colSpan: 4, border: noHorizontalBorders },
      ...castRowSpans(3),
      { text: formatPrice(office.totalOfficeAssignment), style: 'titleBodyAmount', colSpan: 1, border: noHorizontalBorders },
      ...castRowSpans(2)
    ],
    // Fila 2: Personal de Permiso | Total Deducciones
    [
      { text: 'Personal de Permiso', style: 'titleBodyWithoutFill', colSpan: 4, border: noHorizontalBorders },
      ...castRowSpans(3),
      { text: permissionCount.toString(), style: 'titleBodyAmount', colSpan: 1, border: noHorizontalBorders },
      { text: `Total Deducciones: ${office.officeCode}`, style: 'titleBodyWithoutFill', colSpan: 4, border: noHorizontalBorders },
      ...castRowSpans(3),
      { text: formatPrice(office.totalOfficeDeduction), style: 'titleBodyAmount', colSpan: 1, border: noHorizontalBorders },
      ...castRowSpans(2)
    ],
    // Fila 3: Personal de Reposo | Línea divisoria o celda vacía a la derecha
    [
      { text: 'Personal de Reposo', style: 'titleBodyWithoutFill', colSpan: 4, border: noHorizontalBorders },
      ...castRowSpans(3),
      { text: sickLeaveCount.toString(), style: 'titleBodyAmount', colSpan: 1, border: noHorizontalBorders },
      { text: '', colSpan: 7, border: noHorizontalBorders },
      ...castRowSpans(6)
    ],
    // Fila 4: Personal de Vacaciones | Total Neto
    [
      { text: 'Personal de Vacaciones', style: 'titleBodyWithoutFill', colSpan: 4, border: bodersWithHorizontalLines },
      ...castRowSpans(3),
      { text: vacationCount.toString(), style: 'titleBodyAmount', colSpan: 1, border: bodersWithHorizontalLines },
      { text: `Total Neto: ${office.officeCode}`, style: 'titleBodyWithoutFill', colSpan: 4 },
      ...castRowSpans(3),
      { text: formatPrice(totalOfficeNet), style: 'titleBodyAmount', colSpan: 1 },
      ...castRowSpans(2)
    ]
  ]
}

/* NUEVA FUNCIÓN COMPLEMENTARIA: Mantiene exacta simetría de diseño con buildOfficeTotalRows */
const buildGeneralTotalRows = (officeGroups: any[]): TableCell[][] => {
  let totalGeneralAssignment = 0;
  let totalGeneralDeduction = 0;
  let activeGeneralCount = 0;
  let permissionGeneralCount = 0;
  let sickLeaveGeneralCount = 0;
  let vacationGeneralCount = 0;

  officeGroups.forEach((office) => {
    totalGeneralAssignment += office.totalOfficeAssignment || 0;
    totalGeneralDeduction  += office.totalOfficeDeduction || 0;
    activeGeneralCount     += office.activeEmployeesCount || 0;
    permissionGeneralCount += office.permissionEmployeesCount || 0;
    sickLeaveGeneralCount  += office.sickLeaveEmployeesCount || 0;
    vacationGeneralCount   += office.vacationEmployeesCount || 0;
  });

  const totalGeneralNet = totalGeneralAssignment - totalGeneralDeduction;

  return [
    [
      { text: 'Total General Personal Activo', style: 'titleBodyWithoutFill', colSpan: 4, border: noHorizontalBorders },
      ...castRowSpans(3),
      { text: activeGeneralCount.toString(), style: 'titleBodyAmount', colSpan: 1, border: noHorizontalBorders },
      { text: 'Total General Asignaciones:', style: 'titleBodyWithoutFill', colSpan: 4, border: noHorizontalBorders },
      ...castRowSpans(3),
      { text: formatPrice(totalGeneralAssignment), style: 'titleBodyAmount', colSpan: 1, border: noHorizontalBorders },
      ...castRowSpans(2)
    ],
    [
      { text: 'Total General Personal de Permiso', style: 'titleBodyWithoutFill', colSpan: 4, border: noHorizontalBorders },
      ...castRowSpans(3),
      { text: permissionGeneralCount.toString(), style: 'titleBodyAmount', colSpan: 1, border: noHorizontalBorders },
      { text: 'Total General Deducciones:', style: 'titleBodyWithoutFill', colSpan: 4, border: noHorizontalBorders },
      ...castRowSpans(3),
      { text: formatPrice(totalGeneralDeduction), style: 'titleBodyAmount', colSpan: 1, border: noHorizontalBorders },
      ...castRowSpans(2)
    ],
    [
      { text: 'Total General Personal de Reposo', style: 'titleBodyWithoutFill', colSpan: 4, border: noHorizontalBorders },
      ...castRowSpans(3),
      { text: sickLeaveGeneralCount.toString(), style: 'titleBodyAmount', colSpan: 1, border: noHorizontalBorders },
      { text: '', colSpan: 7, border: noHorizontalBorders },
      ...castRowSpans(6)
    ],
    [
      { text: 'Total General Personal de Vacaciones', style: 'titleBodyWithoutFill', colSpan: 4, border: bodersWithHorizontalLines },
      ...castRowSpans(3),
      { text: vacationGeneralCount.toString(), style: 'titleBodyAmount', colSpan: 1, border: bodersWithHorizontalLines },
      { text: 'Total General Neto:', style: 'titleBodyWithoutFill', colSpan: 4 },
      ...castRowSpans(3),
      { text: formatPrice(totalGeneralNet), style: 'titleBodyAmount', colSpan: 1 },
      ...castRowSpans(2)
    ]
  ];
}

const getBodySection = (officeGroups: any[]): Content[] => {
  const bodyContent: Content[] = []

  officeGroups.forEach((office, index) => {
    const tableOffice: TableCell[][] = []

    // ROWS -> STATIC HEADER:(INFO -> OFFICE)
    const officeHeaderRow: TableCell[] = [
      {
        text: `CÓDIGO DEL DEPARTAMENTO`,
        style: 'titleBody',
        colSpan: 4,
      },
      ...castRowSpans(3),
      {
        text: `DENOMINACIÓN DEL DEPARTAMENTO`,
        style: 'titleBody',
        colSpan: 8
      },
      ...castRowSpans(7)
    ]

    // ROWS -> DESCRIPTION HEADER:(INFO -> OFFICE)
    const officeDescriptionRow: TableCell[] = [
      {
        text: `${office.officeCode}`,
        style: 'descriptionBody',
        colSpan: 4
      },
      ...castRowSpans(3),
      {
        text: `${office.officeDenomination}`,
        style: 'descriptionBody',
        colSpan: 8
      },
      ...castRowSpans(7)
    ]

    // ROWS -> STATIC SEPARATOR
    const officeSeparatorRow: TableCell[] = [
      { text: null, colSpan: 12 },
      ...castRowSpans(11)
    ]

    tableOffice.push(officeHeaderRow)
    tableOffice.push(officeDescriptionRow)
    tableOffice.push(officeSeparatorRow)

    // TABLE -> EMPLOYEES
    office.employees.forEach((employee: any) => {
      tableOffice.push(...buildEmployeeRows(employee))
    })

    // ROWS -> STATIC SEPARATOR 2
    const officeSeparatorRow2: TableCell[] = [
      { text: null, colSpan: 12 },
      ...castRowSpans(11)
    ]

    tableOffice.push(officeSeparatorRow2)

    // TABLE -> TOTALS
    tableOffice.push(...buildOfficeTotalRows(office))

    bodyContent.push({
      style: 'body',
      table: {
        headerRows: 2,
        dontBreakRows: true,
        widths: [...Array(12).fill('auto')],
        heights: tableOffice.map(row => (row[0] as any)?.text === null ? 10 : 'auto'),
        body: tableOffice
      },
      layout: getCleanTableLayout(),
      pageBreak: index === 0 ? 'before' : undefined
    })

    if (index < officeGroups.length - 1) {
      bodyContent.push({ text: '', pageBreak: 'after' })
    }
  })

  if (officeGroups.length > 0) {
    const tableGeneral: TableCell[][] = [];

    const generalHeaderRow: TableCell[] = [
      { text: 'RESUMEN GENERAL DE NÓMINA', style: 'titleBody', colSpan: 12 },
      ...castRowSpans(11)
    ];

    const generalSeparatorRow: TableCell[] = [
      { text: null, colSpan: 12 },
      ...castRowSpans(11)
    ];

    tableGeneral.push(generalHeaderRow);
    tableGeneral.push(generalSeparatorRow);
    tableGeneral.push(...buildGeneralTotalRows(officeGroups));

    bodyContent.push({
      style: 'body',
      table: {
        headerRows: 1,
        dontBreakRows: true,
        widths: [...Array(12).fill('*')],
        heights: tableGeneral.map(row => (row[0] as any)?.text === null ? 10 : 'auto'),
        body: tableGeneral
      },
      layout: getCleanTableLayout(),
      pageBreak: 'before'
    })
  }

  return bodyContent
}

export default getBodySection;