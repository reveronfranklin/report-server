import type { Content } from 'pdfmake/interfaces';

interface HeaderOptions {
  subHeader: any;
}

export const subHeaderSection = (options: HeaderOptions): Content => {
  const { subHeader  } = options

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
              { text: `${subHeader.NOMBRE_PROVEEDOR ?? ''}`, style: 'tableContentSubHeader' }
            ]
          },
          {}, {}, {}, {}, {},
          {
            colSpan: 4,
            text: [
              { text: 'CÉDULA o RIF:\n', style: 'tableSubHeader' },
              { text: `${subHeader.RIF_PROVEEDOR ?? ''}`, style: 'tableContentSubHeader' }
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
              { text: `${subHeader.NOMBRE_BENEFICIARIO ?? ''} ${subHeader.APELLIDO_BENEFICIARIO ?? ''}`, style: 'tableContentSubHeader' }
            ]
          }, {}, {}, {},
          {
            text: [
              { text: 'CÉDULA:\n', style: 'tableSubHeader' },
              { text: `${subHeader.CEDULA_BENEFICIARIO ?? ''}`, style: 'tableContentSubHeader' }
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
              { text: `${subHeader.CANTIDAD_PAGO}`, style: 'tableContentSubHeaderNPay' }
            ]
          },
          {
            text: [
              { text: 'FORMA DE PAGO\n', style: 'tableSubHeader' },
              { text: `${subHeader.FORMA_DE_PAGO}`, style: 'tableContentSubHeader' }
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
              { text: `${subHeader.MONTO_LETRAS ?? ''}`, style: 'tableContentSubHeaderAmountLetters' }
            ]
          }, {}, {}, {}, {}, {}, {}
        ]
      ]
    }
  }

  return contentPdf
}