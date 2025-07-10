import type { Content } from 'pdfmake/interfaces';
import { formatPrice } from '@shared/utils';
import { ReportBodyDto } from '../../../../../../application/dtos/debitNoteThirdParties/report-body.dto';

const getBodySection = (options: ReportBodyDto): Content => {
  const {
    payToTheOrderOf,
    reason,
    amount,
    opIcpPucDetail
  } = options

  const contentBody: Content = {
    style: 'body',
    table: {
      widths: ['75%', '25%'],
      heights: [40, 100, 10, 10, 10, 10, 10, 10, 10, 40],
      body: [
        [
          {
            colSpan: 2,
            text: [
              { text: 'HEMOS RECIBIDO DEL CONCEJO MUNICIPAL DE CHACAO, POR CONCEPTO DE: \n', style: '' },
              { text: `${ payToTheOrderOf ?? '' }` }
            ]
          },
          {}
        ],
        [
          {
            colSpan: 2,
            text: [
              { text: 'Motivo: \n\n', style: '' },
              { text: `${ reason ?? '' }` }
            ]
          }, {}
        ],
        [
          {
            text: [
              { text: 'Detalle Orden de Pago: \n\n', style: '' },
              { text: `${ opIcpPucDetail ?? '' }` }
            ]
          },
          {
            text: [
              { text: 'Monto:\n', style: '' },
              { text: `${ amount ? formatPrice(amount ,'VES') : '' }` }
            ]
          }
        ],
        [
          {}, {}
        ],
        [
          {}, {}
        ],
        [
          {}, {}
        ],
        [
          {}, {}
        ],
        [
          {}, {}
        ],
        [
          {}, {}
        ],
        [
          {
            colSpan: 2,
            text: null
          }, {}
        ],
      ]
    }
  }

  return contentBody
}

export default getBodySection;