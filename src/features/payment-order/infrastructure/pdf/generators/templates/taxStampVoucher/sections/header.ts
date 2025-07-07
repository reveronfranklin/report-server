import type { Content } from 'pdfmake/interfaces';

const logoLeft: Content = {
  image: 'src/assets/logoLeft.jpeg',
  width: 80, // Aumenta el tamaño del logo
  height: 70,
  alignment: 'left',
  fit: [80, 70], // Ajusta el tamaño de la imagen
  margin: [0, 0, 0, 0]
}

const logoRight: Content = {
  image: 'src/assets/logoRight.jpg',
  width: 80, // Aumenta el tamaño del logo
  height: 70,
  alignment: 'right',
  fit: [80, 70], // Ajusta el tamaño de la imagen
  margin: [0, 0, 0, 0]
}

interface HeaderOptions {
  header: any;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { header } = options

  const title = header?.title ?? null;

  const contentPdf: Content = {
    //layout: 'lightHorizontalLines', // optional
    style: 'header',
    table: {
      headerRows: 1, // Ajusta el número de filas de la cabecera que se van a repetir en proximas paginas, en este caso solo 1
      widths: ['*', '*', '*', '*'], // Ajusta el tamaño de las columnas
      heights: [20, 20, 20, 20], // Aumenta la altura de las filas
      body: [
        [
          {
            stack: [
              logoLeft
            ],
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
            stack: [
              logoRight
            ],
            border: [false, false]
          }
        ],
        [
          {
            text: null,
            colSpan: 3,
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
            style: 'subTitle',
            text: [
              { text: 'FECHA DE ELABORACIÓN:\n' },
              { text: `${header?.dateElaboration ?? ''}` }
            ],
            border: [true, true, true, true]
          }
        ],
        [
          {
            text: null,
            colSpan: 3,
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
            style: 'subTitle',
            text: [
              { text: 'ORDEN DE PAGO N°:\n' },
              { text: `${header?.paymentOrderNumber ?? ''}` }
            ],
            border: [true, true, true, true]
          }
        ],
        [
          {
            text: null,
            border: [false, false]
          },
          {
            text: `${title}`,
            style: 'title',
            colSpan: 2,
            border: [false, false]
          },
          {
            text: null,
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