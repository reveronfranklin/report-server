import type { Content } from 'pdfmake/interfaces';

interface HeaderOptions {
  subHeader: any;
}

export const subHeaderSection = (options: HeaderOptions): Content => {
  const { subHeader } = options

  const contentPdf: Content = {
    style: 'subHeader',
    table: {
      widths: ['*'],
      heights: [35, 10, 20, 10, 35, 10, 20, 10, 80],
      body: [
        [
          {
            text: [
              {
                text: 'AGENTE DE RETENCIÓN:\n',
                style: 'titleSubHeader'
              },
              {
                text: `${subHeader?.nameWithholdingAgent ?? ''}`,
                style: 'descriptionSubHeader'
              }
            ]
          }
        ],
        [
          {
            text: null,
            border: [false, false]
          }
        ],
        [
          {
            text: [
              {
                text: 'NÚMERO DE RIF DEL AGENTE DE RETENCIÓN:\n',
                style: 'titleSubHeader'
              },
              {
                text: `${subHeader?.withholdingAgentRif ?? ''}`,
                style: 'descriptionSubHeader'
              }
            ]
          }
        ],
        [
          {
            text: null,
            border: [false, false]
          }
        ],
        [
          {
            text: [
              {
                text: 'NOMBRE/RAZON SOCIAL DEL CONTRIBUYENTE:\n',
                style: 'titleSubHeader'
              },
              {
                text: `${subHeader?.taxpayerName ?? ''}`,
                style: 'descriptionSubHeader'
              }
            ]
          }
        ],
        [
          {
            text: null,
            border: [false, false]
          }
        ],
        [
          {
            text: [
              {
                text: 'NÚMERO DE RIF DEL CONTRIBUYENTE:\n',
                style: 'titleSubHeader'
              },
              {
                text: `${subHeader?.taxpayerRifNumber ?? ''}`,
                style: 'descriptionSubHeader'
              }
            ]
          }
        ],
        [
          {
            text: null,
            border: [false, false]
          }
        ],
        [
          {
            text: [
              {
                text: 'CONCEPTO DE LA ORDEN DE PAGO (AGREGAR TODA INFORMACIÓN NECESARIA EN RELACIÓN A LA FACTURA Y ORDEN DE PAGO):\n',
                style: 'titleSubHeader'
              },
              {
                text: `${subHeader?.reason ?? ''}`,
                style: 'descriptionSubHeader'
              }
            ]
          }
        ]
      ]
    }
  }

  return contentPdf
}