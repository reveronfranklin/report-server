import type {
  TDocumentDefinitions,
  StyleDictionary
} from 'pdfmake/interfaces';

import { ReportSchemeDto } from '../../../application/dtos/report-scheme.dto';
import { headerSection } from './sections/payment-order-header';

const styles: StyleDictionary = {
  header: {
    alignment: 'center',
    margin: [20, 25, 60, 20] // Ajusta los márgenes
  },

  body: {
    alignment: 'center',
    margin: [0, 20, 0, 0], // Reduce el margen superior del contenido
  },

  footer: {
    fontSize: 10,
    italics: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },

  orderTitle: {
    fontSize: 13,
    bold: true,
    alignment: 'right',
    margin: [0, -25, 10, 0] // Ajusta el margen superior para mover el texto hacia arriba
  },
  tableHeader: {
    fontSize: 7,
    bold: true,
    margin: [0, 15, 0, 0], // Aumenta el margen superior a 15
    alignment: 'center',
    //fillColor: '#f2f2f2' // cambia el color de fondo de las celdas
  },
  tableContent: {
    fontSize: 9,
    bold: false,
    color: '#444444', // Esto hace que el texto aparezca más claro
    margin: [0, 15, 0, 0], // Aumenta el margen superior a 15
    alignment: 'center'
  }
}

export function createPaymentOrderTemplate(data: ReportSchemeDto): TDocumentDefinitions {
  /* Report sections */
  return {
    pageSize: 'LETTER',
    pageMargins: [40, 130, 40, 60], // Aumenta el margen superior a 120
    styles: styles,

    header: headerSection({
      ...data,
        logoPath: data.logoPath
    }),

    content: [{
      text: 'test',
      style: 'body'
    }],

    footer: {
      text: 'Este es un ejemplo de documento PDF',
      style: 'footer',
    }
  }
}