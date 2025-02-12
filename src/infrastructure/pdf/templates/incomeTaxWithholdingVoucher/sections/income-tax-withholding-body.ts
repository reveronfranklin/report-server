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

  const contentPdf: Content = {
    style: 'body',
    table: {
      headerRows: 1,
      widths: [60, 55, '*', 60, 60, 40, 60, 50],
      heights: [25, 25, 25],
      body: [
        [
          {
            text: 'Nª De Factura',
            style: 'titleBody'
          },
          {
            text: 'Fecha Factura',
            style: 'titleBody'
          },
          {
            text: 'Concepto De Pago',
            style: 'titleBody'
          },
          {
            text: 'Impuesto Exento',
            style: 'titleBody'
          },
          {
            text: 'Base Imponible',
            style: 'titleBody'
          },
          {
            text: '% Alicuota',
            style: 'titleBody'
          },
          {
            text: 'ISLR Retenido',
            style: 'titleBody'
          },
          {
            text: 'Sustraendo',
            style: 'titleBody'
          }
        ],
        [
          {
            text: `${body.invoiceNumber ?? ''}`,
            style: 'descriptionBodyText'
          },
          {
            text: `${body.invoiceDate ?? ''}`,
            style: 'descriptionBodyText'
          },
          {
            text: `${body.conceptPayment ?? ''}`,
            style: 'paymentConcept'
          },
          {
            text: `${body.extensiveTax ?? ''}`,
            style: 'descriptionBodyAmount'
          },
          {
            text: `${body.taxableIncome ?? ''}`,
            style: 'descriptionBodyAmount'
          },
          {
            text: `${body.alicuota ?? ''}`,
            style: 'descriptionBodyAmount'
          },
          {
            text: `${body.incomeTaxWithheld ?? ''}`,
            style: 'descriptionBodyAmount'
          },
          {
            text: `${body.subtrahend ?? ''}`,
            style: 'descriptionBodyAmount'
          }
        ],
        [
          {
            text: null,
            border: [false, false]
          },
          {
            text: null,
            border: [false, false]
          },
          {
            text: null,
            border: [false, false]
          },
          {
            colSpan: 2,
            text: 'TOTALES',
            style: 'totalHeader',
            border: [false, false]
          },
          {
            text: null,
            border: [false, false]
          },
          {
            text: `${body.totalTaxableIncome ?? ''}`,
            style: 'totalAmount',
            border: [false, false]
          },
          {
            text: `${body.totalIncomeTaxWithheld ?? ''}`,
            style: 'totalAmount',
            border: [false, false]
          },
          {
            text: null,
            border: [false, false]
          }
        ]
      ]
    }
  }

  return contentPdf
}