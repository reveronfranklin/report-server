import type { Content } from 'pdfmake/interfaces';
import { getCurrentDate } from '@shared/utils'

const getFooter = (currentPage: number, pageCount: number): Content => {
  const currentDate     = getCurrentDate()
  const firstRowBorder  = [false, false, false, true]
  const secondRowBorder = [false, true, false, false]
  const thrirdRowBorder = [false, false]
  const fourthRowBorder = [false, false]

  const contentFooter: Content = {
    style: 'footer',
    table: {
      headerRows: 1,
      widths: ['35%', '30%', '35%'],
      heights: [60, 10, 10, 10],
      body: [
        [
          {
            text: 'Hago constar que el pago es legal y puede avalarse',
            style: 'footerSignature',
            border: firstRowBorder
          },
          {
            text: null,
            border: [false, false]
          },
          {
            text: 'Hago constar que el pago es correcto y que puede hacerse contra la(s) partida(s) y en la forma indicada',
            style: 'footerSignature',
            border: firstRowBorder
          }
        ],
        [
          {
            text: 'DIRECTOR(A) DE ADMINISTRACIÓN',
            style: 'footerSignature',
            border: secondRowBorder
          },
          {
            text: null,
            border: [false, false]
          },
          {
            text: 'PRESIDENTE (A)',
            style: 'footerSignature',
            border: secondRowBorder
          }
        ],
        [
          {
            text: null,
            border: thrirdRowBorder
          },
          {
            text: null,
            border: thrirdRowBorder
          },
          {
            text: 'YASMIN GONZALEZ',
            style: 'footerNamePresident',
            border: thrirdRowBorder
          }
        ],
        [
          {
            text: `${currentDate}`,
            style: ['footerSoftText', 'footerCurrentDate'],
            border: fourthRowBorder
          },
          {
            text: 'FORMA: OSSMMASOFT C.A.',
            style: 'footerSoftText',
            border: fourthRowBorder
          },
          {
            text: `Pág ${currentPage.toString()} de ${pageCount}`,
            style: ['footerSoftText', 'footerCurrentPage'],
            border: fourthRowBorder
          }
        ]
      ]
    }
  }

  return contentFooter
}

export default getFooter