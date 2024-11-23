import type {
  TDocumentDefinitions,
  StyleDictionary,
  Content
} from 'pdfmake/interfaces';

import { ReportSchemeDto } from '../../../application/dtos/report-scheme.dto';
import { headerSection } from './sections/payment-order-header';
import { subHeaderSection } from './sections/payment-order-sub-header';

import { headerStyles } from './styles/header-styles';
import { subHeaderStyles } from './styles/sub-header-styles';
import { bodyStyles } from './styles/body-styles';
import { footerStyles } from './styles/footer-styles';

const styles: StyleDictionary = {
  ...headerStyles,
  ...subHeaderStyles,
  ...bodyStyles,
  ...footerStyles
};

export function createPaymentOrderTemplate(data: ReportSchemeDto): TDocumentDefinitions {
  const { header, subHeader, body } = data

  // Execute the sections before the return statement
  const headerContent: Content = headerSection({
    header
  })

  const subHeaderContent: Content = subHeaderSection({
    subHeader
  })

  return {
    pageSize: 'LETTER',
    pageMargins: [40, 215, 40, 60],
    styles: styles,

    header: {
      columns: [
        {
          stack: [
            headerContent,
            subHeaderContent
          ]
        }
      ]
    },

    content: [{
      text: 'test',
      style: 'body'
    }],

    footer: {
      text: 'Este es un ejemplo de documento PDF',
      style: 'footer'
    }
  }
}