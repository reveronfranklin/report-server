import type { Content } from 'pdfmake/interfaces';


export const footerSection = (currentPage: number, pageCount: number): Content => {
  const contentPdf: Content = {
    style: 'footer',
    table: {
      headerRows: 1,
      widths: ['*', '*', '*'],
      heights: [10, 10, 10, 10], // Aumenta la altura de las filas
      body: [
        [
          {
            text: 'EL LIQUIDADOR:',
            style: 'footerTitle',
            border: [true, true, false, false]
          },
          {
            text: 'ENTE GUBERNAMENTAL:',
            style: 'footerTitle',
            border: [true, true, false, false]
          },
          {
            text: 'RECIBIDO POR:',
            style: 'footerTitle',
            border: [true, true, true, false]
          }
        ],
        [
          {
            text: 'Firma:',
            style: 'footerSignature',
            border: [true, false, true, false]
          },
          {
            text: 'Firma:',
            style: 'footerSignature',
            border: [true, false, true, false]
          },
          {
            text: 'Firma:',
            style: 'footerSignature',
            border: [true, false, true, false]
          }
        ],
        [
          {
            text: 'Sello:',
            style: 'footerSignature',
            border: [true, false, true, false]
          },
          {
            text: 'Sello:',
            style: 'footerSignature',
            border: [true, false, true, false]
          },
          {
            text: 'Sello:',
            style: 'footerSignature',
            border: [true, false, true, false]
          }
        ],
        [
          {
            text: 'Fecha:',
            style: 'footerSignature',
            border: [true, false, true, true]
          },
          {
            text: 'Fecha:',
            style: 'footerSignature',
            border: [true, false, true, true]
          },
          {
            text: 'Fecha:',
            style: 'footerSignature',
            border: [true, false, true, true]
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
