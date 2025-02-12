import type { Content } from 'pdfmake/interfaces';

interface HeaderOptions {
  subHeader: any;
}

export const subHeaderSection = (options: HeaderOptions): Content => {
  const { subHeader  } = options

  const contentPdf: Content = {
    layout: 'noBorders', // optional
    style: 'subHeader',
    table: {
      widths: [250, 220, 130, 90],
      heights: [35, 35, 35, 35],
      body: [
        [
          {
            text: [
              { text: 'Nombre o Razón Social del Agente de Retención\n', style: 'titleSubHeader' },
              { text: `${subHeader?.NOMBRE_PROVEEDOR ?? 'CONCEJO MUNICIPAL DEL MUNICIPIO CHACAO' }`, style: 'descriptionSubHeader' }
            ]
          },
          {
            text: [
              { text: 'Telefonos del Agente de Retencion\n', style: 'titleSubHeader' },
              { text: `${subHeader?.RIF_PROVEEDOR ?? ' / 0212-905.74.62; 0212-905.74.53' }`, style: 'descriptionSubHeader' }
            ]
          },
          {
            text: [
              { text: 'RIF del Agente de Retención\n', style: 'titleSubHeader' },
              { text: `${subHeader?.RIF_PROVEEDOR ?? 'G-200074590' }`, style: 'descriptionSubHeader' }
            ]
          },
          {
            text: [
              { text: 'FECHA\n', style: 'titleSubHeader' },
              { text: `${subHeader?.RIF_PROVEEDOR ?? '05/09/2024' }`, style: 'descriptionSubHeader' }
            ]
          }
        ],
        [
          {
            colSpan: 2,
            text: [
              { text: 'Dirección Fiscal del Agente de Retención\n', style: 'titleSubHeader' },
              { text: `${subHeader?.NOMBRE_PROVEEDOR ?? 'EDF. ATRIUM, PISO 2. AV. VENEZUELA CON CALLE SOROCAIMA. EL ROSAL. EDO. MIRANDA. DTTO. CAPI' }`, style: 'descriptionSubHeader' }
            ]
          },
          {},
          {
            colSpan: 2,
            text: [
              { text: 'Período Fiscal\n', style: 'titleSubHeader' },
              { text: `${subHeader?.RIF_PROVEEDOR ?? 'Año:2024  Mes:09' }`, style: 'descriptionSubHeader' }
            ]
          },
          {}
        ],
        [
          {
            colSpan: 2,
            text: [
              { text: 'Nombre o Razón Social del Sujeto Retenido\n', style: 'titleSubHeader' },
              { text: `${subHeader?.NOMBRE_PROVEEDOR ?? 'FRESH TECHS, C.A' }`, style: 'descriptionSubHeader' }
            ]
          },
          {},
          {
            text: [
              { text: 'RIF del Sujeto Retenido\n', style: 'titleSubHeader' },
              { text: `${subHeader?.RIF_PROVEEDOR ?? 'J-406694576' }`, style: 'descriptionSubHeader' }
            ]
          },
          {
            text: [
              { text: 'Nro. Orden Pago\n', style: 'titleSubHeader' },
              { text: `${subHeader?.RIF_PROVEEDOR ?? '508' }`, style: 'descriptionSubHeader' }
            ]
          }
        ],
      ]
    }
  }

  return contentPdf
}