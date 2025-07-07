import type { Content } from 'pdfmake/interfaces';

const logo: Content = {
  image: 'src/assets/logoLeft.jpeg',
  width: 120, // Aumenta el tamaño del logo
  height: 60,
  alignment: 'left',
  fit: [130, 70], // Ajusta el tamaño de la imagen
  margin: [4, 4, 10, 0]
}

interface HeaderOptions {
  header: any;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { header } = options

  const words = header.title ? header.title.trim().split(/\s+/) : '';
  const wordCount = words.length;
  const titleStyle = wordCount > 3 ? 'orderTitleVariable' : 'orderTitle';

  let formattedTitle: Content;

  if (wordCount > 3) {
    const firstLine = words.slice(0, 3).join(' ');
    const secondLine = words.slice(3).join(' ');
    formattedTitle = {
      stack: [
        { text: firstLine, style: titleStyle },
        { text: secondLine, style: 'orderTitleTwo' }
      ]
    };
  } else {
    formattedTitle = { text: header.title, style: titleStyle };
  }

  const contentPdf: Content = {
    style: 'header',
    table: {
      widths: ['*', '*', '*', '*', '*', '*'],
      heights: [25, 25, 25, 25, 25, 25], // Aumenta la altura de las filas
      body: [
        [
          {
            // Combina el logo y el texto en la misma celda
            stack: [
              logo,
              formattedTitle
            ],
            rowSpan: 3,
            colSpan: 3,
          },
          {}, {},
          {
            text: [
              { text: 'TIPO DE ORDEN\n', style: 'tableHeader' },
              { text: `${header.description}`, style: 'tableContent' }
            ]
          },
          {
            text: [
              { text: 'ORDEN DE PAGO #\n', style: 'tableHeader' },
              { text: `${header.paymentOrderNumber}`, style: 'tableContent' }
            ]
          },
          {
            text: [
              { text: 'FECHA ORDEN DE PAGO\n', style: 'tableHeader' },
              { text: `${header.paymentOrderDate}`, style: 'tableContent' }
            ]
          }
        ],
        [
          {}, {}, {},
          {
            colSpan: 2,
            text: [
              { text: 'NUMERO COMPROMISO #\n', style: 'tableHeader' },
              { text: `${ header.commitmentNumber ?? '' }`, style: 'tableContent' }
            ]
          }, {},
          {
            text: [
              { text: 'FECHA COMPROMISO\n', style: 'tableHeader' },
              { text: `${header.commitmentDate}`, style: 'tableContent' }
            ]
          }
        ],
        [
          {}, {}, {},
          { colSpan: 2, text: [] },
          {}, {}
        ]
      ]
    }
  }

  return contentPdf
}