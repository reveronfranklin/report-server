import type { Content } from 'pdfmake/interfaces';
import { formatPrice } from '@shared/utils';
import { ReportBodyDto } from '../../../../../../application/dtos/debitNoteThirdParties/report-body.dto';

const getBodySection = (options: ReportBodyDto): Content => {
  const {
    amount,
    opIcpPucAmount,
    opIcpPucDetail,
    payToTheOrderOf,
    reason,
    taxWithholdingAmount
  } = options

  const contentBody: Content = {
    style: 'body',
    table: {
      widths: ['72%', '12%', '16%'],
      heights: [50, 120, 20, 200, 50],
      body: [
        [
          {
            colSpan: 3,
            text: [
              { text: 'HEMOS RECIBIDO DEL CONCEJO MUNICIPAL DE CHACAO, POR CONCEPTO DE: \n', style: 'tableBodyTitle' },
              { text: `${ payToTheOrderOf ?? '' }`, style: 'tableBodyContent' }
            ],
            style: 'tableBody'
          },
          {}, {}
        ],
        [
          {
            text: [
              { text: 'Motivo: \n', style: 'tableBodyTitle' },
              { text: `${ reason ?? '' }`, style: 'tableBodyContent' },
            ],
            colSpan: 3,
            style: 'tableBody'
          },
          {}, {}
        ],
        [
          {
            text: 'Detalle Orden de Pago:',
            style: 'tableBodyTitle',
            margin: [5, 5],
            border: [true, true, true, false]
          },
          {
            text: [
              {
                text: 'Monto: \n',
                style: 'tableBodyAmountTitle'
              },
              {
                text: `${ opIcpPucAmount ? formatPrice(opIcpPucAmount ,'VES') : '' }`,
                style: 'tableBodyAmountDescription'
              }
            ],
            colSpan: 2,
            style: 'tableBody',
            border: [true, true, true, false]
          },
          {}
        ],
        [
          {
            text: `${ opIcpPucDetail ?? '' }`,
            style: 'tableBodyContent',
            margin: [5, 0],
            border: [true, false, true, true]
          },
          {
            text: [
              {
                text: `Retenciones / Fondo a Tercero: \n\n`,
                style: 'titleAmount',
              },
              {
                text: `Beneficiario / Proveedor:`,
                style: 'titleAmount'
              }
            ],
            border: [true, false, false, true]
          },
          {
            text: [
              {
                text: `${ taxWithholdingAmount ? formatPrice(taxWithholdingAmount ,'VES') : '' } \n`,
                style: 'amount'
              },
              {
                text: `${ amount ? formatPrice(amount ,'VES') : '' }`,
                style: 'amount'
              }
            ],
            style: 'tableBody',
            border: [false, false, true, true]
          }
        ],
        [
          {
            colSpan: 3,
            text: null
          },
          {}, {}
        ]
      ]
    }
  }

  return contentBody
}

export default getBodySection;