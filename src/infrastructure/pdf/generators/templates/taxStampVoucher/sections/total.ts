import type { Content } from 'pdfmake/interfaces';

/* Utils */
import { formatPrice } from '../../../../../../shared/utils';

interface HeaderOptions {
  body: any;
}

export const bodyTotalSection = (options: HeaderOptions): Content => {
  const { totalGrossAmount, totalAmountVat, totalNetTaxableIncome, withholdingPercentage } = options.body

  const contentPdf: Content = {
    style: 'total',
    table: {
      headerRows: 1,
      widths: [60, 240, '*', '*'],
      heights: [10, 10, 10, 10, 10, 10, 10, 10],
      body: [
        [
          {
            text: 'CÁLCULO DEL IMPUESTO 1x1000:',
            style: 'totalHeader',
            colSpan: 4,
            border: [true, true, true, false]
          },
          {
            text: null
          },
          {
            text: null
          },
          {
            text: null
          }
        ],
        [
          {
            text: null,
            colSpan: 4,
            border: [true, false, true, false]
          },
          {
            text: null
          },
          {
            text: null
          },
          {
            text: null
          }
        ],
        [
          {
            text: null,
            border: [true, false, false, false]
          },
          {
            text: 'MONTO BRUTO (MONTO TOTAL DE LA ORDEN DE PAGO)',
            style: 'totalTitle',
            border: [false, false]
          },
          {
            text: `${formatPrice(totalGrossAmount ?? 0, 'VES')}`,
            style: 'totalAmount',
            border: [true, true, true, true]
          },
          {
            text: null,
            border: [false, false, true, false]
          }
        ],
        [
          {
            text: null,
            border: [true, false, false, false]
          },
          {
            text: 'MONTO DEL I.V.A. 16%',
            style: 'totalTitle',
            border: [false, false]
          },
          {
            text: `${formatPrice(totalAmountVat ?? 0, 'VES')}`,
            style: 'totalAmount',
            border: [true, true, true, true]
          },
          {
            text: null,
            border: [false, false, true, false]
          }
        ],
        [
          {
            text: null,
            border: [true, false, false, false]
          },
          {
            text: 'MONTO NETO GRAVABLE',
            style: 'totalTitle',
            border: [false, false]
          },
          {
            text: `${formatPrice(totalNetTaxableIncome ?? 0, 'VES')}`,
            style: 'totalAmount',
            border: [true, true, true, true]
          },
          {
            text: null,
            border: [false, false, true, false]
          }
        ],
        [
          {
            text: null,
            colSpan: 4,
            border: [true, false, true, false]
          },
          {
            text: null
          },
          {
            text: null
          },
          {
            text: null
          }
        ],
        [
          {
            text: null,
            border: [true, false, false, false]
          },
          {
            text: 'IMPUESTO (1x1000) A RETENER:',
            style: 'totalTitleLast',
            border: [false, false]
          },
          {
            text: `${formatPrice(withholdingPercentage ?? 0, 'VES')}`,
            style: 'totalAmount',
            border: [true, true, true, true]
          },
          {
            text: null,
            border: [false, false, true, false]
          }
        ],
        [
          {
            text: null,
            colSpan: 4,
            border: [true, false, true, true]
          },
          {
            text: null
          },
          {
            text: null
          },
          {
            text: null
          }
        ]
      ]
    }
  }

  return contentPdf
}