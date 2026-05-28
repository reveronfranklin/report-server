import type { Content, TableCell } from 'pdfmake/interfaces';
import { castRowSpans, getSmartTableWidths } from '@shared/utils';

import { getCleanTableLayout } from '../../../components/layout/clean-table.layout';
import { ReportFooterDto } from '../../../../../../application/dtos/generalPayrollReport/report-footer.dto';

const noHorizontalBorders       = [false, false, false, false];

export default function getFooterSignatures(footers: ReportFooterDto[]): Content {
  const signatureContent: Content[] = [];

  if (!footers || !Array.isArray(footers) || footers.length === 0) {
    return { text: '' }
  }

  const groupedFooters = footers.reduce((accumulator, currentFooter) => {
    const officeName = currentFooter.office || 'GERENCIA GENERAL'
    if (!accumulator[officeName]) {
      accumulator[officeName] = []
    }
    accumulator[officeName].push(currentFooter)
    return accumulator
  }, {} as Record<string, ReportFooterDto[]>)

  Object.entries(groupedFooters).forEach(([officeTitle, signatories]) => {
    const tableBody: TableCell[][] = []

    tableBody.push([
      { text: (officeTitle || 'GERENCIA').toUpperCase(), style: 'footerTitle', colSpan: 12 },
      ...castRowSpans(11)
    ])

    signatories.sort((firstSignature, secondSignature) => {
      const orderValueA = firstSignature.order || ''
      const orderValueB = secondSignature.order || ''
      return orderValueA.localeCompare(orderValueB, undefined, { numeric: true, sensitivity: 'base' })
    })

    signatories.forEach((signature) => {
      tableBody.push([
        {
          text: [
            { text: 'Elaborado: ', style: 'footerTitleVariant' },
            { text: (signature.name || '').toUpperCase(), style: 'footerText' }
          ],
          colSpan: 3
        },
        ...castRowSpans(2),

        { text: (signature.lastName || '').toUpperCase(), style: 'footerText', colSpan: 2 },
        ...castRowSpans(1),

        { text: signature.idCard || '', style: 'footerText', colSpan: 1 },

        { text: (signature.jobDescription || '').toUpperCase(), style: 'footerText', colSpan: 3 },
        ...castRowSpans(2),

        {
          stack: [
            { text: '', margin: [0, 15, 0, 0] },
            { text: `${ [...Array(50).fill('_')].join('') }`, style: 'footerSignature' },
            { text: 'Firma', style: 'footerSignature' }
          ],
          colSpan: 3
        },
        ...castRowSpans(2)
      ])
    })

    tableBody.push([
      { text: null, colSpan: 12, border: noHorizontalBorders },
      ...castRowSpans(11)
    ])

    signatureContent.push({
      style: 'footer',
      table: {
        dontBreakRows: true,
        widths: getSmartTableWidths({
          totalColumns: 12,
          strategy: 'flexible',
          starColumns: [11]
        }),
        heights: tableBody.map(row => (row[0] as any)?.text === null ? 10 : 'auto'),
        body: tableBody
      },
      layout: getCleanTableLayout()
    })
  })

  return {
    stack: signatureContent,
    pageBreak: 'before'
  }
}