import type { Content } from 'pdfmake/interfaces';
import getLogoSection from '../logo';

const getStaticHeaderSection = (currentPage: number, pageCount: number): Content => {
  const logo = getLogoSection()

  const contentStaticHeader: Content = {
    layout: 'noBorders',
    style: 'staticHeader',
    table: {
      widths: ['auto', '*', '*', '*'],
      heights: ['auto', 10, 10],
      body: [
        [
          {
            stack: [
              logo
            ]
          },
          { text: null },
          { text: null },
          {
            text: `Página ${currentPage.toString()} de ${pageCount}`,
            style: 'headerCurrentPage'
          }
        ],
        [
          {
            text: 'REPORTE GENERAL DE NÓMINA',
            style: 'headerText'
          },
          { text: null },
          { text: null },
          { text: null }
        ],
        [
          {
            text: 'NÓMINA ALTO NIVEL',
            style: 'headerText'
          },
          {
            text: '1ra Quincena de MAYO de 2026',
            colSpan: 2,
            style: 'headerTitle'
          },
          { text: null },
          { text: null }
        ]
      ]
    }
  }

  return contentStaticHeader
}

export default getStaticHeaderSection