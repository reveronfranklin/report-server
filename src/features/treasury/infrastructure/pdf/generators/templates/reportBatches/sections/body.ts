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
      heights: [50, 120, 20, 150, 50, 50],
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
            text: 'N° Control PAEL:',
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
             text: [
              { text: 'Detalle Orden de Pago: \n', style: 'tableBodySubtitle' },
              { text: opIcpPucDetail ?? '' }
            ],
            style: 'tableBodyContent',
            margin: [5, 0],
            border: [true, false, true, false]
          },
          {
            text: null,
            border: [true, false, false, false]
          },
          {
            text: null,
            style: 'tableBody',
            border: [false, false, true, false]
          }
        ],
        [
          {
            text: [
              { text: 'Impuestos y Deducciones: \n', style: 'tableBodySubtitle' },
              {
                text: `FIANZA DE FIEL CUMPLIMIENTO 1.984.070,00 / IMPUESTO AL VALOR AGREGADO (I.V.A.) 2.380.884,00 / LEY DE TIMBRE FISCAL 19.840,70 `,
                style: 'tableBodyContent'
              }
            ],
            border: [true, false]
          },
          {
            text: `${ taxWithholdingAmount ? formatPrice(taxWithholdingAmount ,'VES') : '' } \n`,
            style: 'amount',
            colSpan: 2,
            border: [true, false, true, false]
          }, {}
        ],
        [
          {
            text: `
              Recibi Conforme:___________________________________\n
              C.I.: \n
              Fecha:\n
            `,
            style: 'tableBodySignature',
            border: [true, false, true, true]
          },
          {
            text: [
              {
                text: 'Total: \n',
                style: 'tableBodyAmountTitle'
              },
              {
                text: `${ amount ? formatPrice(amount ,'VES') : '' }`,
                style: 'tableBodyAmountDescription'
              }
            ],
            colSpan: 2,
            border: [true, false, true, true]
          }, {}
        ]
      ]
    }
  }

  return contentBody
}

export default getBodySection;