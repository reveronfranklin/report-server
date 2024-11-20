
import type {
  Content,
  Column
} from 'pdfmake/interfaces';


const logo: Content = {
  image: null,
  width: 25,
  //height: 100,
  alignment: 'center',
  fit: [200, 100],
  margin: [10, 10, 0, 0]
}

interface HeaderOptions {
  logoPath?: string;
  headers?: any;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { logoPath, headers  } = options

  logo.image = logoPath

  const contentPdf: Content = {
    //margin: [15, 15, 15, 15],
    table: {
      widths: ['*', '*', '*', '*', '*', '*'],
      body: [
        [
          {
            rowSpan: 3,
            colSpan: 3,
            text: [
              logo,
              { text: 'Logo', style: 'tableHeader' },
              { text: 'ORDEN DE PAGO', style: 'orderTitle' }
            ]
          },
          {
            rowSpan: 3,
            text: []
          },
          {
            rowSpan: 3,
            text: [
              { text: '', style: 'tableHeader' },
              { text: '', style: 'tableContent' }
            ]
          },
          {
            text: [
              { text: 'TIPO DE ORDEN\n', style: 'tableHeader' },
              { text: `${headers.DESCRIPCION}`, style: 'tableContent' }
            ]
          },
          {
            text: [
              { text: 'ORDEN DE PAGO #\n', style: 'tableHeader' },
              { text: `${headers.NUMERO_ORDEN_PAGO}`, style: 'tableContent' }
            ]
          },
          {
            text: [
              { text: 'FECHA ORDEN DE PAGO\n', style: 'tableHeader' },
              { text: `${headers.FECHA_COMPROMISO}`, style: 'tableContent' }
            ]
          }
        ],
        [
          {},
          {},
          {},
          {
            colSpan: 2,
            text: [
              { text: 'NUMERO COMPROMISO #\n', style: 'tableHeader' },
              { text: `${headers.NUMERO_COMPROMISO}`, style: 'tableContent' }
            ]
          },
          {},
          {
            text: [
              { text: 'FECHA COMPROMISO\n', style: 'tableHeader' },
              { text: `${headers.FECHA_COMPROMISO}`, style: 'tableContent' }
            ]
          }
        ],
        [
          {
            colSpan: 2,
            text: []
          },
          {
            colSpan: 2,
            text: []
          },
          {
            colSpan: 2,
            text: []
          },
          {
            colSpan: 2,
            text: []
          },
          {},
          {}
        ]
      ]
    },
    /* layout: {
      hLineWidth: (i, node) => 1,
      vLineWidth: (i, node) => 1,
      hLineColor: (i, node) => '#000000',
      vLineColor: (i, node) => '#000000',
      paddingLeft: (i, node) => 10,
      paddingRight: (i, node) => 10,
      paddingTop: (i, node) => 10,
      paddingBottom: (i, node) => 10,
    } */
  } as Column // Cast to Column type

  return {
    columns: [contentPdf]
  }
}