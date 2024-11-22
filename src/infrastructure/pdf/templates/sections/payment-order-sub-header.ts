import type { Content } from 'pdfmake/interfaces';

interface HeaderOptions {
  headers?: any;
}

export const subHeaderSection = (options: HeaderOptions): Content => {
  const { headers  } = options

  const darkColor = '#444444'; // Cambiamos a negro para las líneas
  const lineWidth = 0.5; // Grosor de línea más fino

  const contentPdf: Content = {
    style: 'subHeader',
    table: {
      widths: ['*', 120, 30, '*', 100, 24, 4, '*', 4, '*'],
      heights: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20], // Aumenta la altura de las filas
      body: [
        [
          {
            colSpan: 6,
            text: [
              { text: 'NOMBRE APELLIDO O RAZON SOCIAL DEL PROVEEDOR:\n', style: 'tableSubHeader' },
              { text: `${headers.NOMBRE_PROVEEDOR}`, style: 'tableContentSubHeader' }
            ]
          },
          {}, {}, {}, {}, {},
          {
            colSpan: 4,
            text: [
              { text: 'CÉDULA o RIF:\n', style: 'tableSubHeader' },
              { text: `${headers.RIF_PROVEEDOR}`, style: 'tableContentSubHeader' }
            ]
          },
          {},
          {},
          {}
        ],
        [
          {
            colSpan: 4,
            text: [
              { text: 'APELLIDOS Y NOMBRES:\n', style: 'tableSubHeader' },
              { text: `${headers.NOMBRE_BENEFICIARIO} ${headers.APELLIDO_BENEFICIARIO}`, style: 'tableContentSubHeader' }
            ]
          }, {}, {}, {},
          {
            text: [
              { text: 'CÉDULA:\n', style: 'tableSubHeader' },
              { text: `${headers.CEDULA_BENEFICIARIO ?? ''}`, style: 'tableContentSubHeader' }
            ]
          },
          {
            text: 'PLAZO DE PAGO', style: 'tableSubHeaderPlazo'
          },
          {
            text: `DESDE`, style: 'sinceTo'
          }, {},
          {
            text: `HASTA`, style: 'sinceTo'
          },
          {}
        ],
        [
          {
            text: [
              { text: 'Nº DE PAGO\n', style: 'tableSubHeaderNPay' },
              { text: `1`, style: 'tableContentSubHeaderNPay' }
            ]
          },
          {
            text: [
              { text: 'FORMA DE PAGO\n', style: 'tableSubHeader' },
              { text: `${headers.FORMA_DE_PAGO}`, style: 'tableContentSubHeader' }
            ]
          },
          {
            text: [
              { text: 'CÓDIGO\n', style: 'tableSubHeader' },
              { text: ``, style: 'tableContentSubHeader' }
            ]
          },
          {
            colSpan: 7,
            text: [
              { text: 'ÚNICO O PERIÓDICO (BOLÍVARES EN LETRAS)\n', style: 'tableSubHeaderAmountLetters' },
              { text: `${headers.MONTO_LETRAS}`, style: 'tableContentSubHeaderAmountLetters' }
            ]
          }, {}, {}, {}, {}, {}, {}
        ]
      ]
    },
    layout: {
      hLineWidth: (i, node) => lineWidth,
      vLineWidth: (i, node) => lineWidth,
      hLineColor: (i, node) => darkColor,
      vLineColor: (i, node) => darkColor,
      paddingTop: (i, node) => 10,
      paddingBottom: (i, node) => 10,
      paddingLeft: (i, node) => 10,
      paddingRight: (i, node) => 10
    }
  }

  return contentPdf
}