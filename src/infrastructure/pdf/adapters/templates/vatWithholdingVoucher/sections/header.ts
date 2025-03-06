import type { Content } from 'pdfmake/interfaces';

const logo: Content = {
  image: 'src/assets/logoLeft.jpeg',
  width: 60, // Aumenta el tamaño del logo
  height: 50,
  alignment: 'left',
  fit: [60, 50], // Ajusta el tamaño de la imagen
  margin: [30, 0, 0, 40]
}

interface HeaderOptions {
  header: any;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { header  } = options

  const subTitle = header?.subTitle ?? null;

  const contentPdf: Content = {
    layout: 'noBorders', // optional
    style: 'header',
    table: {
      headerRows: 1, // Ajusta el número de filas de la cabecera que se van a repetir en proximas paginas, en este caso solo 1
      widths: ['*', '*', '*'], // Ajusta el tamaño de las columnas
      heights: [25, 25], // Aumenta la altura de las filas
      body: [
        [
          {
            // Combina el logo y el texto en la misma celda
            stack: [
              logo,
              {
                text: subTitle,
                style: 'subTitle'
              }
            ],
            rowSpan: 2
          },
          {
            text: 'COMPROBANTE DE RETENCIÓN IVA\n', style: 'title',
            rowSpan: 2
          },
          {
            text: null,
            rowSpan: 2
          }
        ],
        [
          {}, {}, {}
        ]
      ]
    }
  }

  return contentPdf
}