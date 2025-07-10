import type { Content } from 'pdfmake/interfaces';

const logo: Content = {
  image: 'src/assets/logoLeft.jpeg',
  width: 120,
  height: 60,
  alignment: 'left',
  fit: [130, 70],
  margin: [4, 4, 10, 0]
}

interface HeaderOptions {
  header: any;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { header } = options

  const formattedTitle = {
    text: 'NOTA DE DÉBITO',
    style: 'orderTitle'
  }

  const fifthRowBorder = [false, false]
  const sixthRowBorder = [false, false, true, false]

  const contentPdf: Content = {
    style: 'header',
    table: {
      widths: ['*', '*', 20, 20, '*', '*'],
      heights: [35, 10, 10, 10],
      body: [
        [
          {
            stack: [
              logo,
              formattedTitle
            ],
            rowSpan: 4,
            colSpan: 3
          },
          {}, {},
          {
            rowSpan: 4,
            text: null,
            border: [true, true, false, true]
          },
          {
            text: null,
            border: [false, true, false, false]
          },
          {
            text: [
              { text: `${ header?.checkNumber ?? '' }\n`, style: 'tableHeader' },
              { text: 'N° NOTA DE DÉBITO:', style: 'tableHeader' }
            ],
            margin: [0, 10, 10, 0],
            border: [false, true, true, false]
          }
        ],
        [
          {}, {}, {}, {},
          {
            text: 'Fecha:',
            style: 'tableHeader',
            border: fifthRowBorder
          },
          {
            text: `${ header?.checkDate ?? '' }`,
            style: 'tableContent',
            border: sixthRowBorder
          }
        ],
        [
          {}, {}, {}, {},
          {
            text: 'Banco:', style: 'tableHeader',
            border: fifthRowBorder
          },
          {
            text: `${ header?.name ?? '' }`,
            style: 'tableContent',
            border: sixthRowBorder
          }
        ],
        [
          {}, {}, {}, {},
          {
            text: 'N° de Cuenta:',
            style: 'tableHeader',
            border: [false, false, false, true],
            margin: [0, 0, 0, 10]
          },
          {
            text: `${ header?.accountNumber ?? '' }`,
            style: 'tableContent',
            border: [false, false, true, true],
            margin: [0, 0, 0, 10]
          }
        ]
      ]
    }
  }

  return contentPdf
}