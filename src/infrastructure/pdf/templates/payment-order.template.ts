import type {
  TDocumentDefinitions,
  StyleDictionary
} from 'pdfmake/interfaces';

import { ReportSchemeDto } from '../../../application/dtos/report-scheme.dto';
import { headerSection } from './sections/payment-order-header';

const styles: StyleDictionary = {
  orderTitle: {
    fontSize: 16,
    bold: true,
    alignment: 'left'
  },
  tableHeader: {
    fontSize: 8,
    bold: true,
    color: '#000000',
    alignment: 'left'
  },
  tableContent: {
    fontSize: 10,
    bold: false,
    color: '#000000',
    alignment: 'left'
  },

  header: {},

  body: {
    alignment: 'center',
    margin: [30, 30, 30, 30],
  },

  footer: {
    fontSize: 10,
    italics: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  }
}

export function createPaymentOrderTemplate(data: ReportSchemeDto): TDocumentDefinitions {
  /* Report sections */
  return {
    //pageSize: 'A5',
    pageMargins: [40, 60, 40, 60],
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