import type { Content, TableCell } from 'pdfmake/interfaces';

interface HeaderOptions {
  body: any;
}

const numberOfRowForTableFunds: number = 10;
const numberOfRowForTableWithholdings: number = 8;

const formatPrice = (price: number, currency: string) => {
  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);

  // Eliminar 'VES' si aparece al final, con o sin espacio
  return formattedPrice.replace(/\s*VES$/, '').trim();
}

const getTableWithholdings = (body: HeaderOptions['body']): TableCell[][] => {
  const tableBody: TableCell[][] = [];

  for (let i = 0; i < numberOfRowForTableWithholdings; i++) {
    const row = body.WITHHOLDING[i] || {};

    const firstRow = (i === 0);
    const lastRow = (i === (numberOfRowForTableWithholdings - 1));

    const data: TableCell[] = [
      {
        colSpan: 2,
        text: firstRow ? formatPrice(body.TOTAL_ORDEN_PAGO, 'VES') : '',
        style: firstRow ? 'tableBodyWithholdings' : '',
        border: [true, firstRow, true, lastRow]
      },
      {},
      {
        colSpan: 6,
        text: row.DESCRIPCION ?? '',
        style: 'withholdings',
        border: [true, firstRow, true, lastRow]
      },
      {}, {}, {}, {}, {},
      {
        colSpan: 2,
        text: row.MONTO_RETENIDO ? formatPrice(row.MONTO_RETENIDO, 'VES') : '',
        style: 'tableBodyWithholdings',
        border: [true, firstRow, true, lastRow]
      },
      {},
      {
        colSpan: 2,
        text: firstRow ? formatPrice(body.MONTO_PAGAR, 'VES') : '',
        style: firstRow ? 'tableBodyWithholdings' : '',
        border: [true, firstRow, true, lastRow]
      },
      {}
    ];

    tableBody.push(data);
  }

  return tableBody;
};

const getTableFunds = (body: HeaderOptions['body']): TableCell[][] => {
  const tableBody: TableCell[][] = []

  for (let i = 0; i < numberOfRowForTableFunds; i++) {
    const row = body[i] || {};

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
        text: row.PERIODICO ? formatPrice(row.PERIODICO, 'VES') : '',
        style: 'tableBodyAmount',
        border: [true, false]
      },
      {},
      {
        colSpan: 2,
        text: row.MONTO ? formatPrice(row.MONTO, 'VES') : '',
        style: 'tableBodyAmount',
        border: [true, false, true, false]
      },
      {}
    ]

    tableBody.push(data);
  }

  return tableBody;
};

export const bodySection = (options: HeaderOptions): Content => {
  const { body  } = options

  const tableFunds = getTableFunds(body.FUNDS)
  const tableWithholdings = getTableWithholdings(body)

  const contentPdf: Content = {
    style: 'body',
    table: {
      widths: ['*', '*', '*', '*', 30, 30, 30, 30, '*', '*', '*', '*'],
      heights: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 100, 10, 10, 10, 10, 10, 10, 10, 10, 10],
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
        ...tableFunds,
        /* Footer or totals table */
        [
          {
            colSpan: 8,
            text: 'TÍTULO DE LA ESPECIFICA',
            style: 'tableHeaderFooter',
            margin: [5, 0],
            border: [true, true, true, false]
          }, {}, {}, {}, {}, {}, {}, {},
          {
            colSpan: 2,
            text: formatPrice(body.TOTAL_ORDEN_PAGO, 'VES'),
            style: 'tableTotal'
          },
          {},
          {
            colSpan: 2,
            text: formatPrice(body.TOTAL_ORDEN_PAGO, 'VES'),
            style: 'tableTotal'
          },
          {}
        ],
        [
          {
            colSpan: 8,
            text: 'SERVICIOS DE TELEFONÍA PRESTADOS POR INSTITUCIONES PRIVADAS',
            style: 'tableFooter',
            margin: [5, 0],
            border: [true, false, true, true]
          },
          {}, {}, {}, {}, {}, {}, {},
          {
            colSpan: 2,
            text: 'TOTAL',
            style: 'tableHeaderTotal'
          }, {},
          {
            colSpan: 2,
            text: 'TOTAL ANUAL',
            style: 'tableHeaderTotal'
          },
          {}
        ],
        /* Motivos */
        [
          {
            colSpan: 12,
            text: [
              {
                text: 'MOTIVO\n',
                style: 'tableHeaderReason'
              },
              {
                text: "PAGO POR SERVICIO DE TELEFONIA MOVIL 4G LTE PARA LAS DIFERENTES DEPENDENCIAS DEL CONCEJO MUNICIPAL DEL MUNICIPIO CHACAO, DEL PERIODO DEL 01/02/2024 AL 29/02/2024 SEGUN FACTURA N°76304665 META: TRAMITACION DE LOS PROCEDIMIENTOS DE CONTRATACION DE LAS COMPRAS Y SERVICIOS SOLICITADOS POR LAS DEPENDENCIAS DEL CONCEJO MUNICIPAL DEL MUNICIPIO CHACAO. TODO LO ANTES EXPUESTO ES PARA DAR CUMPLIMIENTO AL POAM DEL EJERCICIO FISCAL AÑO 2024.",
                style: 'tableReason'
              }
            ],
            margin: [5, 0]
          }
        ],
        /* Retenciones */
        [
          {
            colSpan: 2,
            text: 'TOTAL ORDEN PAGO',
            style: 'tableHeaderWithholdings'
          }, {},
          {
            colSpan: 6,
            text: 'TOTAL RETENCIONES',
            style: 'tableHeaderWithholdings'
          }, {}, {}, {}, {}, {},
          {
            colSpan: 2,
            text: 'MONTO RETENIDO',
            style: 'tableHeaderWithholdings'
          }, {},
          {
            colSpan: 2,
            text: 'MONTO A PAGAR',
            style: 'tableHeaderWithholdings'
          }, {}
        ],
        ...tableWithholdings
      ]
    }
  }

  return contentPdf
}