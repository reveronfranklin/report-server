import type { Content, TableCell, Table } from 'pdfmake/interfaces';

interface HeaderOptions {
  body: any[];
}

const numberOfRowForTableBody: number = 8;

const getTotals = (body: HeaderOptions): any[] => {
  const totals: any[] = []
  return totals
}

const getTableBody = (body: HeaderOptions['body']): TableCell[][] => {
  const tableBody: TableCell[][] = [];

  for (let i = 0; i < numberOfRowForTableBody; i++) {
    const row = body[i] || {};  // Usa un objeto vacío si no hay datos para esta fila

    const data: TableCell[] = [
      {
        text: row.ANO?.toString() || '',
        style: 'tableBody',
        border: [true, false]
      },
      {
        colSpan: 3,
        text: row.DESCRIPCION_FINANCIADO || '',
        style: 'tableBodyDescription',
         border: [true, false]
      },
      {}, {},
      {
        colSpan: 2,
        text: row.CODIGO_ICP_CONCAT || '',
        style: 'tableBody',
         border: [true, false]
      },
      {},
      {
        colSpan: 2,
        text: row.CODIGO_PUC_CONCAT || '',
        style: 'tableBody',
        border: [true, false]
      },
      {},
      {
        colSpan: 2,
        text: row.PERIODICO || '',
        style: 'tableBodyAmount',
        border: [true, false]
      },
      {},
      {
        colSpan: 2,
        text: row.MONTO || '',
        style: 'tableBodyAmount',
        border: [true, false, true, false]
      },
      {}
    ];

    tableBody.push(data);
  }

  return tableBody;
};

export const bodySection = (options: HeaderOptions): Content => {
  const { body  } = options

  const tableBody = getTableBody(body)

  console.log('bodySection', tableBody)

  const contentPdf: Content = {
    style: 'body',
    table: {
      widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
      //heights: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
      body: [
        /* header table */
        [
          {
            colSpan: 6,
            text: 'CIFRAS DE LA CUENTA',
            style: 'headerTableBody'
          },
          {}, {}, {}, {}, {},
          {
            colSpan: 2,
            text: 'CLASE DE GASTO',
            style: 'headerTableBody'
          }, {},
          {
            colSpan: 2,
            text: 'PAGO ÚNICO O PERIÓDICO',
            style: 'headerTableBody'
          }, {},
          {
            colSpan: 2,
            text: 'PAGO ANUAL',
            style: 'headerTableBody'
          }, {}
        ],
         /* subHeader table */
        [
          {
            text: 'AÑO',
            style: 'subHeaderTableBody'
          },
          {
            colSpan: 3,
            text: 'FONDO',
            style: 'subHeaderTableBody'
          },
          {}, {},
          {
            colSpan: 2,
            text: 'CÓDIGO ICP',
            style: 'subHeaderTableBody'
          },
          {},
          {
            colSpan: 2,
            text: 'CÓDIGO PUC',
            style: 'subHeaderTableBody'
          },
          {},
          {
            colSpan: 2,
            text: 'BOLIVARES',
            style: 'subHeaderTableBody'
          },
          {},
          {
            colSpan: 2,
            text: 'BOLIVARES',
            style: 'subHeaderTableBody'
          },
          {}
        ],
        /* Body table */
        ...tableBody,
        /* Footer or totals table */
        [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
        [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
        /* Motivos */
        [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
        /* Retenciones */
      ]
    }
  }

  return contentPdf
}