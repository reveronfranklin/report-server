import type { Content, TableCell } from 'pdfmake/interfaces';
import { getCleanTableLayout } from '../../../components/layout/clean-table.layout';

/* Utils */
import { formatPrice, castRowSpans } from '@shared/utils';

const buildConceptRows = (employee: any): TableCell[][] => {
  const tableConcept: TableCell[][] = [];

  // 1. LA CABECERA SE SACA DEL FOR-EACH (Se ejecuta una sola vez por empleado)
  const conceptHeaderRow: TableCell[] = [
    { text: 'TIPO', style: 'titleBodyVariant', colSpan: 1 },
    { text: 'N°', style: 'titleBody', colSpan: 1 },
    { text: '%', style: 'titleBody', colSpan: 1 },
    { text: 'CONCEPTO', style: 'titleBodyVariant', colSpan: 3 }, ...castRowSpans(2),
    { text: 'COMPLEMENTO', style: 'titleBodyVariant', colSpan: 2 }, ...castRowSpans(1),
    { text: 'ASIGNACIONES', style: 'titleBody', colSpan: 1 },
    { text: 'DEDUCCIONES', style: 'titleBody', colSpan: 1 },
    { text: 'ACUMULADOS', style: 'titleBody', colSpan: 2 }, ...castRowSpans(1)
  ];

  tableConcept.push(conceptHeaderRow);

  // Variables para acumular los totales en caliente
  let totalAssignment = 0;
  let totalDeduction = 0;

  // 2. EL BUCLE SOLO SACA FILAS DE DESCRIPCIÓN Y ACUMULA VALORES
  employee.concepts.forEach((concept: any) => {
    totalAssignment += concept.assignment || 0;
    totalDeduction += concept.deduction || 0;

    const conceptDescriptionRow: TableCell[] = [
      { text: concept.conceptType || '', style: 'descriptionBodyVariant', colSpan: 1 },
      { text: concept.conceptNumber || '', style: 'descriptionBody', colSpan: 1 },
      { text: concept.percentage?.toString() || null, style: 'descriptionBody', colSpan: 1 },
      { text: concept.conceptDenomination.toUpperCase(), style: 'descriptionBodyVariant', colSpan: 3 }, ...castRowSpans(2),
      { text: concept.conceptComplement || '', style: 'descriptionBodyVariant', colSpan: 2 }, ...castRowSpans(1),
      { text: concept.assignment > 0 ? formatPrice(concept.assignment) : '', style: 'descriptionBodyAmount', colSpan: 1 },
      { text: concept.deduction > 0 ? formatPrice(concept.deduction) : '', style: 'descriptionBodyAmount', colSpan: 1 },
      { text: '', style: 'descriptionBodyAmount', colSpan: 2 }, ...castRowSpans(1)
    ];

    tableConcept.push(conceptDescriptionRow);
  });

  // 3. FILA DE TOTALES (Fondo blanco para etiquetas, gris SOLO en los montos)
  const conceptTotalRow: TableCell[] = [
    { text: 'TOTALES:', style: 'titleBody', colSpan: 8, alignment: 'right', fillColor: '#FFFFFF' }, ...castRowSpans(7),
    { 
      text: totalAssignment > 0 ? formatPrice(totalAssignment) : '0,00', 
      style: 'titleBody', 
      alignment: 'right', 
      colSpan: 1,
      fillColor: '#EFEFEF' // Gris exclusivo para el monto
    },
    { 
      text: totalDeduction > 0 ? formatPrice(totalDeduction) : '0,00', 
      style: 'titleBody', 
      alignment: 'right', 
      colSpan: 1,
      fillColor: '#EFEFEF' // Gris exclusivo para el monto
    },
    { text: '', style: 'descriptionBodyAmount', colSpan: 2, fillColor: '#FFFFFF' }, ...castRowSpans(1)
  ];
  tableConcept.push(conceptTotalRow);

  // 4. FILA DE NETO A COBRAR (Fondo blanco para etiquetas, gris SOLO en el monto neto)
  const netToPay = totalAssignment - totalDeduction;

  const netPayRow: TableCell[] = [
    { text: 'NETO A COBRAR:', style: 'titleBody', colSpan: 9, alignment: 'right', fillColor: '#FFFFFF' }, ...castRowSpans(8),
    { 
      text: formatPrice(netToPay), 
      style: 'titleBody', 
      alignment: 'right', 
      colSpan: 1,
      fillColor: '#EFEFEF' // Gris exclusivo para el monto neto
    },
    { text: '', style: 'descriptionBodyAmount', colSpan: 2, fillColor: '#FFFFFF' }, ...castRowSpans(1)
  ];
  tableConcept.push(netPayRow);

  return tableConcept;
};

const buildEmployeeRows = (employee: any): TableCell[][] => {
  const tableEmployee: TableCell[][] = []

  // ROWS -> HEADER: INFO EMPLOYEES
  const employeeHeaderRow: TableCell[] = [
    { text: 'CÉDULA', style: 'titleBody', colSpan: 1 },
    { text: 'NOMBRE Y APELLIDO', style: 'titleBody', colSpan: 3 }, ...castRowSpans(2),
    { text: 'CARGO', style: 'titleBody', colSpan: 2 }, ...castRowSpans(1),
    { text: 'CÓDIGO', style: 'titleBody', colSpan: 1 },
    { text: 'INGRESO', style: 'titleBody', colSpan: 1 },
    { text: 'SUELDO', style: 'titleBody', colSpan: 1 },
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



    // Totals
    /* const totalOfficeNet = office.totalOfficeAssignment - office.totalOfficeDeduction;
    tableOffice.push([
      { text: `TOTAL OFICINA ${office.officeCode}:`, style: 'officeTotalLabel', colSpan: 8 }, ...castRowSpans(7),
      { text: formatPrice(office.totalOfficeAssignment), style: 'officeTotalAmount' },
      { text: formatPrice(office.totalOfficeDeduction), style: 'officeTotalAmount' },
      { text: formatPrice(totalOfficeNet), style: 'officeTotalNetFinal', colSpan: 2 }, ...castRowSpans(1)
    ]); */



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

  return bodyContent
}

export default getBodySection;