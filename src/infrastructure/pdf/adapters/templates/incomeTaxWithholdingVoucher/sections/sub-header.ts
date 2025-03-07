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
              { text: `${subHeader?.retentionAgentName ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {
            text: [
              { text: 'Telefonos del Agente de Retencion\n', style: 'titleSubHeader' },
              { text: `${subHeader?.retentionAgentPhone ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {
            text: [
              { text: 'RIF del Agente de Retención\n', style: 'titleSubHeader' },
              { text: `${subHeader?.retentionAgentRif ?? '' }`, style: 'descriptionSubHeader' }
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
              { text: 'Dirección Fiscal del Agente de Retención\n', style: 'titleSubHeader' },
              { text: `${subHeader?.retentionAgentAddress ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {},
          {
            colSpan: 2,
            text: [
              { text: 'Período Fiscal\n', style: 'titleSubHeader' },
              { text: `${subHeader?.fiscalPeriod ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {}
        ],
        [
          {
            colSpan: 2,
            text: [
              { text: 'Nombre o Razón Social del Sujeto Retenido\n', style: 'titleSubHeader' },
              { text: `${subHeader?.retainedSubjectName ?? '' }`, style: 'descriptionSubHeader' }
            ]
          },
          {},
          {
            text: [
              { text: 'RIF del Sujeto Retenido\n', style: 'titleSubHeader' },
              { text: `${subHeader?.retainedSubjectRif ?? '' }`, style: 'descriptionSubHeader' }
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