import type { Content } from 'pdfmake/interfaces';


export const footerSection = (): Content => {
  const contentPdf: Content = {
    style: 'footer',
    table: {
      headerRows: 1,
      widths: ['*', '*', '*'],
      heights: [10, 10], // Aumenta la altura de las filas
      body: [
        [
          {
            text: 'BENEFICIARIO',
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
            colSpan: 3,
            text: 'FORMA: OSSMMASOFT C.A.',
            style: 'footerText',
            border: [false, false]
          }
        ]
      ]
    }
  }

  return contentPdf
}
