import type {
  TDocumentDefinitions,
  StyleDictionary,
  Content
} from 'pdfmake/interfaces';

/* Dtos */
import { ReportSchemeDto } from '../../../../../application/dtos/paymentOrder/report-scheme.dto';

/* Components */
import getWatermark from '../../../adapters/components/watermark';
import getFooter from '../../../adapters/components/footer';

/* Sections */
import { headerSection } from './sections/header';
import { subHeaderSection } from './sections/sub-header';
import { bodySection } from './sections/body';

/* Styles */
import { headerStyles } from './styles/header';
import { subHeaderStyles } from './styles/sub-header';
import { bodyStyles } from './styles/body';
import { footerStyles } from '../../../adapters/components/footer/styles';

const styles: StyleDictionary = {
  ...headerStyles,
  ...subHeaderStyles,
  ...bodyStyles,
  ...footerStyles
};

export function createPaymentOrderTemplate(data: ReportSchemeDto): TDocumentDefinitions {
  const { status, header, subHeader, body } = data

  // Execute the sections before the return statement
  const headerContent: Content = headerSection({
    header
  })

  const subHeaderContent: Content = subHeaderSection({
    subHeader
  })

  const bodyContent: Content = bodySection({
    body,
  })

  const watermark = getWatermark(status)

  return {
    pageSize: 'LETTER',
    pageOrientation: 'portrait',
    pageMargins: [20, 215, 60, 100],
    styles: styles,
    watermark: watermark,
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
    footer: (currentPage, pageCount) => {
      const footerContent: Content = getFooter(currentPage, pageCount)
      return footerContent
    }
  }
}