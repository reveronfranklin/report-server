import { TDocumentDefinitions, Content, Column } from 'pdfmake/interfaces';

export function createPaymentOrderTemplate(data: { logoPath: string }): TDocumentDefinitions {
  const contentPdf: Content = {
    columns: [
      {
        width: '25%',
        image: data.logoPath,
        fit: [200, 100],
        margin: [10, 10, 0, 0]
      } as unknown as Column, // Cast to unknown first, then to Column
      {
        width: '20%',
        text: 'ORDEN DE PAGO',
        style: 'orderTitle',
        margin: [0, 40, 0, 0]
      } as Column, // Cast to Column type
      {
        width: '55%',
        table: {
          widths: ['*', '*', '*'],
          body: [
            [
              {
                text: [
                  { text: 'TIPO DE ORDEN\n', style: 'tableHeader' },
                  { text: 'Especial', style: 'tableContent' }
                ]
              },
              {
                text: [
                  { text: 'ORDEN DE PAGO #\n', style: 'tableHeader' },
                  { text: '145', style: 'tableContent' }
                ]
              },
              {
                text: [
                  { text: 'FECHA ORDEN DE PAGO\n', style: 'tableHeader' },
                  { text: '22/03/2024', style: 'tableContent' }
                ]
              }
            ],
            [
              {
                colSpan: 2,
                text: [
                  { text: 'NUMERO COMPROMISO #\n', style: 'tableHeader' },
                  { text: 'CMC-CMP-00146', style: 'tableContent' }
                ]
              },
              {},
              {
                text: [
                  { text: 'FECHA COMPROMISO\n', style: 'tableHeader' },
                  { text: '21/03/2024', style: 'tableContent' }
                ]
              }
            ]
          ]
        },
        layout: {
          hLineWidth: (i, node) => 1,
          vLineWidth: (i, node) => 1,
          hLineColor: (i, node) => '#000000',
          vLineColor: (i, node) => '#000000',
          paddingLeft: (i, node) => 10,
          paddingRight: (i, node) => 10,
          paddingTop: (i, node) => 10,
          paddingBottom: (i, node) => 10,
        }
      } as Column // Cast to Column type
    ]
  };

  return {
    content: [contentPdf],
    styles: {
      orderTitle: {
        fontSize: 16,
        bold: true,
        alignment: 'left'
      },
      tableHeader: {
        fontSize: 8,
        bold: true,
        color: '#000000',
        alignment: 'left'
      },
      tableContent: {
        fontSize: 10,
        bold: false,
        color: '#000000',
        alignment: 'left'
      }
    },
    defaultStyle: {
      columnGap: 20
    }
  };
}