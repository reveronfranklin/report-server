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
        text: `${row.operationNumber ?? ''}`,
        style: 'descriptionBodyText'
      },
      {
        text: `${row?.invoiceDate ?? ''}`,
        style: 'descriptionBodyText'
      },
      {
        text: `${row?.invoiceNumber ?? ''}`,
        style: 'descriptionBodyText'
      },
      {
        text: `${row?.invoiceControlNumber ?? ''}`,
        style: 'descriptionBodyText'
      },
      {
        text: `${row?.debitNoteNumber ?? ''}`,
        style: 'descriptionBodyText'
      },
      {
        text: `${row?.creditNoteNumber ?? ''}`,
        style: 'descriptionBodyText'
      },
      {
        text: `${row?.transactionType ?? ''}`,
        style: 'descriptionBodyText'
      },
      {
        text: `${row?.affectedInvoiceNumber ?? ''}`,
        style: 'descriptionBodyText'
      },
      {
        text: `${formatPrice(row?.totalPurchasesIncludingVat ?? 0, 'VES')}`,
        style: 'descriptionBodyAmount'
      },
      {
        text: `${formatPrice(row?.purchasesWithoutVatCredit ?? 0, 'VES')}`,
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
        text: `${formatPrice(row?.vatTax ?? 0, 'VES')}`,
        style: 'descriptionBodyAmount'
      },
      {
        text: `${formatPrice(row?.vatWithheld ?? 0, 'VES')}`,
        style: 'descriptionBodyAmount'
      }
    ]

    tableBody.push(data)
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
      widths: [20, '*', '*', '*', '*', '*', '*', '*',  '*', '*', '*', 30, '*', '*'],
      heights: [25],
      body: [
        [
          {
            text: 'Nº Oper.',
            style: 'titleBody'
          },
          {
            text: 'Fecha Factura',
            style: 'titleBody'
          },
          {
            text: 'Nº De Factura',
            style: 'titleBody'
          },
          {
            text: 'Nº  Ctrol. Factura',
            style: 'titleBody'
          },
          {
            text: 'Nº Nota de Débito',
            style: 'titleBody'
          },
          {
            text: 'Nº Nota de Crédito',
            style: 'titleBody'
          },
          {
            text: 'Tipo Transacción',
            style: 'titleBody'
          },
          {
            text: 'Nº Factura Afectada',
            style: 'titleBody'
          },
          {
            text: 'Total Compras Incluyendo I.V.A.',
            style: 'titleBody'
          },
          {
            text: 'Compras sin derecho a Crédito I.V.A',
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
            text: 'Impuesto I.V.A.',
            style: 'titleBody'
          },
          {
            text: 'I.V.A. Retenido',
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
            text: `${formatPrice(body.totalPurchasesVat ?? 0, 'VES')}`,
            style: 'totalAmount',
            border: [false, false]
          },
          {
            text: `${formatPrice(body.totalPurchasesCredit ?? 0, 'VES')}`,
            style: 'totalAmount',
            border: [false, false]
          },
          {
            text: `${formatPrice(body.totalTaxableBase ?? 0, 'VES')}`,
            style: 'totalAmount',
            border: [false, false]
          },
          {
            text: null,
            border: [false, false]
          },
          {
            text: `${formatPrice(body.totalVatTax ?? 0, 'VES')}`,
            style: 'totalAmount',
            border: [false, false]
          },
          {
            text: `${formatPrice(body.totalVatWithheld ?? 0, 'VES')}`,
            style: 'totalAmount',
            border: [false, false]
          }
        ]
      ]
    }
  }

  return contentPdf
}