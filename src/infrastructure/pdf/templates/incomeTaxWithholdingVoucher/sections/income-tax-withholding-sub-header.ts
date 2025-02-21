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
              { text: `${subHeader?.NOMBRE_AGENTE_RETENCION ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {
            text: [
              { text: 'Telefonos del Agente de Retencion\n', style: 'titleSubHeader' },
              { text: `${subHeader?.TELEFONO_AGENTE_RETENCION ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {
            text: [
              { text: 'RIF del Agente de Retención\n', style: 'titleSubHeader' },
              { text: `${subHeader?.RIF_AGENTE_RETENCION ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {
            text: [
              { text: 'FECHA\n', style: 'titleSubHeader' },
              { text: `${subHeader?.FECHA ?? '' }`, style: 'descriptionSubHeader' }
            ]
          }
        ],
        [
          {
            colSpan: 2,
            text: [
              { text: 'Dirección Fiscal del Agente de Retención\n', style: 'titleSubHeader' },
              { text: `${subHeader?.DIRECCION_AGENTE_RETENCION ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {},
          {
            colSpan: 2,
            text: [
              { text: 'Período Fiscal\n', style: 'titleSubHeader' },
              { text: `${subHeader?.PERIODO_FISCAL ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {}
        ],
        [
          {
            colSpan: 2,
            text: [
              { text: 'Nombre o Razón Social del Sujeto Retenido\n', style: 'titleSubHeader' },
              { text: `${subHeader?.NOMBRE_SUJETO_RETENIDO ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {},
          {
            text: [
              { text: 'RIF del Sujeto Retenido\n', style: 'titleSubHeader' },
              { text: `${subHeader?.RIF_SUJETO_RETENIDO ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {
            text: [
              { text: 'Nro. Orden Pago\n', style: 'titleSubHeader' },
              { text: `${subHeader?.NRO_ORDEN_PAGO ?? '' }`, style: 'descriptionSubHeader' }
            ]
          }
        ],
      ]
    }
  }

  return contentPdf
}