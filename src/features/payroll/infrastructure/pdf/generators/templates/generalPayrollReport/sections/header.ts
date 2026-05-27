import type { Content, TableCell } from 'pdfmake/interfaces';
import { ReportHeaderDto } from '../../../../../../application/dtos/generalPayrollReport/report-header.dto';

/* Utils */
import { formatPrice } from '@shared/utils';

const noHorizontalBorders = [false, false, false, false];

const buildConceptRows = (concepts: ReportHeaderDto[]): TableCell[][] => {
  return concepts.map((item): TableCell[] => [
    { text: item.conceptNumber ?? '', colSpan: 1, style: 'firstColumn', border: noHorizontalBorders },
    { text: item.conceptDenomination ?? '', colSpan: 3, style: 'description', border: noHorizontalBorders },
    {}, {} as TableCell,
    { text: '', colSpan: 2, border: noHorizontalBorders },
    {} as TableCell,
    { text: formatPrice(item.assignment), colSpan: 2, style: 'descriptionVariant', border: noHorizontalBorders },
    {} as TableCell,
    { text: formatPrice(item.deduction), colSpan: 2, style: 'descriptionVariant', border: noHorizontalBorders },
    {} as TableCell,
    { text: formatPrice(item.visibleAmount), colSpan: 2, style: 'descriptionVariant', border: noHorizontalBorders },
    {} as TableCell
  ])
}

const buildTotalRows = (
  totalAssignments: number,
  totalDeductions: number,
  totalGeneral: number,
  deductibleAmount: number,
  netPayable: number
): TableCell[][] => {
  return [
    // ------------------------------------------------------------------
    // FILA 1: Totales directos al ras de las columnas de datos
    // ------------------------------------------------------------------
    [
      { text: '', colSpan: 1 },
      { text: '', colSpan: 3 },
      {}, {},
      { text: '', colSpan: 2 },
      {},
      { text: formatPrice(totalAssignments), colSpan: 2, style: 'descriptionVariant' },
      {},
      { text: formatPrice(totalDeductions), colSpan: 2, style: 'descriptionVariant' },
      {},
      { text: formatPrice(totalGeneral), colSpan: 2, style: 'descriptionVariant' },
      {}
    ],

    // ------------------------------------------------------------------
    // FILA 2: Bloque "Deducible" (Línea del medio)
    // ------------------------------------------------------------------
    [
      { text: '', colSpan: 1 },
      { text: 'Deducible', colSpan: 5, style: 'subTitle' },
      {}, {}, {}, {},
      { text: formatPrice(deductibleAmount), colSpan: 2, style: 'descriptionVariant' },
      {},
      { text: '0,00', colSpan: 2, style: 'descriptionVariant' },
      {},
      { text: '', colSpan: 2 },
      {}
    ],

    // ------------------------------------------------------------------
    // FILA 3: Bloque "Total Asignaciones" (Tu estructura original restaurada)
    // ------------------------------------------------------------------
    [
      { text: '', colSpan: 1 },
      { text: 'Total Asignaciones', colSpan: 5, style: 'subTitle' },
      {}, {}, {}, {},
      { text: formatPrice(netPayable), colSpan: 2, style: 'descriptionVariant' },
      {},
      { text: formatPrice(totalDeductions), colSpan: 2, style: 'descriptionVariant' },
      {},
      { text: '', colSpan: 2 },
      {}
    ]
  ]
}

const getDynamicHeaderSection = (options: ReportHeaderDto[]): Content => {
  const headerRow: TableCell[] = [
    { text: 'Nº', colSpan: 1, style: 'titleFirstColumn' },
    { text: 'CONCEPTO', colSpan: 3, style: 'title' },
    {}, {},
    { text: null, colSpan: 2, style: 'title' },
    {},
    { text: 'ASIGNACIONES', colSpan: 2, style: 'titleVariant' },
    {},
    { text: 'DEDUCCIONES', colSpan: 2, style: 'titleVariant' },
    {},
    { text: 'GENERAL', colSpan: 2, style: 'titleVariant' },
    {}
  ]

  let totalAssignments = 0
  let totalDeductions  = 0
  let totalGeneral     = 0

  let deductibleAmount  = 0
  let netPayable        = 0

  options.forEach(item => {
    const hasConceptNumber = item.conceptNumber && item.conceptNumber.trim() !== ''

    if (hasConceptNumber) {
      if (item.conceptType === 'A') totalAssignments += item.assignment ?? 0
      if (item.conceptType === 'D') totalDeductions  += item.deduction ?? 0
    } else if (item.deductible && item.deductible > 0) {
      if (item.deductible === 1) {
        deductibleAmount += item.assignment ?? 0
      } else {
        netPayable += item.assignment ?? 0
      }
    }
  })

  totalGeneral = totalAssignments - totalDeductions

  if (netPayable === 0) {
    netPayable = totalGeneral - deductibleAmount
  }

  const cleanConceptsForBody = options.filter(
    item => item.conceptNumber && item.conceptNumber.trim() !== ''
  )

  const conceptRows = buildConceptRows(cleanConceptsForBody)
  const totalRows   = buildTotalRows(totalAssignments, totalDeductions, totalGeneral, deductibleAmount, netPayable)

  const contentHeader: Content = {
    style: 'header',
    layout: {
      hLineWidth: (i, node) => (i === 0 || i === node.table.headerRows) ? 1 : 0.5,
      hLineColor: () => '#d3d3d3',
      vLineWidth: () => 0,
      paddingTop: (i) => i === 0 ? 1.5 : 4,
      paddingBottom: (i) => i === 0 ? 1.5 : 4,
      paddingLeft: () => 5,
      paddingRight: () => 5,
    },
    table: {
      headerRows: 1,
      widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
      heights: 'auto',
      body: [
        headerRow,
        ...conceptRows,
        ...totalRows
      ]
    }
  }

  return contentHeader
}

export default getDynamicHeaderSection;