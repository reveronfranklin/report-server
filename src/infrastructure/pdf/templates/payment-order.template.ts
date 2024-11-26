import type {
  TDocumentDefinitions,
  StyleDictionary,
  Content
} from 'pdfmake/interfaces';

import { ReportSchemeDto } from '../../../application/dtos/report-scheme.dto';
import { headerSection } from './sections/payment-order-header';
import { subHeaderSection } from './sections/payment-order-sub-header';
import { bodySection } from './sections/payment-order-body';

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

  console.log('createPaymentOrderTemplate', body)

  // Execute the sections before the return statement
  const headerContent: Content = headerSection({
    header
  })

  const subHeaderContent: Content = subHeaderSection({
    subHeader
  })

  const bodyContent: Content = bodySection({
    body
  })

  return {
    pageSize: 'LETTER',
    pageMargins: [20, 215, 60, 60],
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

    content: bodyContent,

    footer: {
      text: 'Este es un ejemplo de documento PDF',
      style: 'footer'
    }
  }
}