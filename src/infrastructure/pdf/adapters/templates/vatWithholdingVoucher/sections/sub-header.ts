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
      widths: [250, 140, 150, 150],
      heights: [35, 35, 35, 35, 35],
      body: [
        [
          {
            colSpan: 2,
            text: ''
          },
          {},
          {
            text: [
              { text: 'Nº Comprobante\n', style: 'titleSubHeader' },
              { text: `${subHeader?.voucherNumber ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {
            text: [
              { text: 'FECHA\n', style: 'titleSubHeader' },
              { text: `${subHeader?.date ?? '' }`, style: 'descriptionSubHeader' }
            ]
          }
        ],
        [
          {
            colSpan: 2,
            text: [
              { text: 'Nombre o Razón Social del Agente de Retención\n', style: 'titleSubHeader' },
              { text: `${subHeader?.nameWithholdingAgent ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {},
          {
            text: [
              { text: 'RIF del Agente de Retención\n', style: 'titleSubHeader' },
              { text: `${subHeader?.withholdingAgentRif ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {
            text: [
              { text: 'Período Fiscal\n', style: 'titleSubHeader' },
              { text: `${subHeader?.fiscalPeriod ?? '' }`, style: 'descriptionSubHeader' }
            ]
          }
        ],
        [
          {
            colSpan: 4,
            text: [
              { text: 'Dirección Fiscal del Agente de Retención\n', style: 'titleSubHeader' },
              { text: `${subHeader?.withholdingAgentAddress ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {},
          {},
          {}
        ],
        [
          {
            colSpan: 2,
            text: [
              { text: 'Nombre o Razón Social del Sujeto Retenido\n', style: 'titleSubHeader' },
              { text: `${subHeader?.subjectNameWithheld ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {},
          {
            text: [
              { text: 'RIF del Sujeto Retenido\n', style: 'titleSubHeader' },
              { text: `${subHeader?.subjectNameWithheldRif ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {
            text: [
              { text: 'Nro. Orden Pago\n', style: 'titleSubHeader' },
              { text: `${subHeader?.paymentOrderNumber ?? '' }`, style: 'descriptionSubHeader' }
            ]
          }
        ]
      ]
    }
  }

  return contentPdf
}