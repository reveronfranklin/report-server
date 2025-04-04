import type { Content } from 'pdfmake/interfaces';

const getFooter = (currentPage: number, pageCount: number): Content => {
  const contentPdf: Content = {
    style: 'footer',
    table: {
      headerRows: 1,
      widths: ['*', '*', '*'],
      heights: [10, 10],
      body: [
        [
          {
            text: 'PRESIDENTE (A)',
            style: 'footerSignature',
            border: [false, true, false, false]
          },
          {
            text: null,
            border: [false, false, false, false]
          },
          {
            text: 'DIRECTOR(A) DE ADMINISTRACIÓN',
            style: 'footerSignature',
            border: [false, true, false, false]
          }
        ],
        [
          {
            text: null,
            border: [false, false]
          },
          {
            text: 'FORMA: OSSMMASOFT C.A.',
            style: 'footerText',
            border: [false, false]
          },
          {
            text: `Pág ${currentPage.toString()} de ${pageCount}`,
            style: 'footerCurrentPage',
            border: [false, false]
          }
        ]
      ]
    }
  }

  return contentPdf
}

export default getFooter