import type { Content, TableCell } from 'pdfmake/interfaces';

interface HeaderOptions {
  withHolding: any;
}

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

const getTableWithholding = (withHolding: any): TableCell[][] => {
  const tableBody: TableCell[][] = [];

  for (let i = 0; i < withHolding.length; i++) {
    const row = withHolding[i] || {};

    const data: TableCell[] = [
      {
        text: `${row.invoiceControlNumber ?? ''}`,
        style: 'descriptionBodyText'
      },
      {
        text: `${row?.invoiceNumber ?? ''}`,
        style: 'descriptionBodyText'
      },
      {
        text: `${formatPrice(row?.documentAmount ?? 0, 'VES')}`,
        style: 'descriptionBodyAmount'
      }
    ]

    tableBody.push(data)
  }

  return tableBody;
};

export const bodySection = (options: HeaderOptions): Content => {
  const { withHolding } = options

  const tableWithholding = getTableWithholding(withHolding)

  const contentPdf: Content = {
    style: 'body',
    table: {
      headerRows: 1,
      widths: ['*', '*', '*'],
      heights: [10],
      body: [
        [
          {
            text: 'Nº Control Factura',
            style: 'titleBody'
          },
          {
            text: 'Nº De Factura',
            style: 'titleBody'
          },
          {
            text: 'Monto',
            style: 'titleBody'
          }
        ],
        ...tableWithholding
      ]
    }
  }

  return contentPdf
}