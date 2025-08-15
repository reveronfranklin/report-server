import type { Content, TableCell } from 'pdfmake/interfaces';

/* Utils */
import { formatPrice } from '@shared/utils';

interface HeaderOptions {
  body: any;
}

const getTableWithholding = (withHolding: any): TableCell[][] => {
  const tableBody: TableCell[][] = [];

  for (let i = 0; i < withHolding.length; i++) {
    const row = withHolding[i] || {};

    const data: TableCell[] = [
      {
        text: `${row.invoiceNumber ?? ''}`,
        style: 'descriptionBodyText'
      },
      {
        text: `${row?.invoiceDate ?? ''}`,
        style: 'descriptionBodyText'
      },
      {
        text: `${row?.conceptPayment ?? ''}`,
        style: 'paymentConcept'
      },
      {
        text: `${formatPrice(row?.extensiveTax ?? 0, 'VES')}`,
        style: 'descriptionBodyAmount'
      },
      {
        text: `${formatPrice(row?.taxableIncome ?? 0, 'VES')}`,
        style: 'descriptionBodyAmount'
      },
      {
        text: `${row?.alicuota ?? ''}`,
        style: 'descriptionBodyAmount'
      },
      {
        text: `${formatPrice(row?.incomeTaxWithheld ?? 0, 'VES')}`,
        style: 'descriptionBodyAmount'
      },
      {
        text: `${formatPrice(row?.subtrahend ?? 0, 'VES')}`,
        style: 'descriptionBodyAmount'
      }
    ];

    tableBody.push(data);
  }

  return tableBody;
};

export const bodySection = (options: HeaderOptions): Content => {
  const { body } = options

  const tableWithholding = getTableWithholding(body.withHolding)

  const contentPdf: Content = {
    style: 'body',
    table: {
      headerRows: 1,
      widths: [60, 50, '*', 62, 62, 62, 62, 52],
      heights: [25, 25, 25],
      body: [
        [
          {
            text: 'Nº De Factura',
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
        ...tableWithholding,
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
            text: `${formatPrice(body.totalTaxableIncome ?? 0, 'VES')}`,
            style: 'totalAmount',
            border: [false, false]
          },
          {
            text: `${formatPrice(body.totalIncomeTaxWithheld ?? 0, 'VES')}`,
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