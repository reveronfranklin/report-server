import type {
  TDocumentDefinitions,
  StyleDictionary,
  Content
} from 'pdfmake/interfaces';

/* Dtos */
import { ReportSchemeDto } from '../../../../application/dtos/taxStampVoucher/report-scheme.dto';

/* Components */
import getWatermark from '../../components/watermark';

/* Sections */
import { headerSection } from './sections/header';
import { subHeaderSection } from './sections/sub-header';
import { bodySection } from './sections/body';
import { bodyTotalSection } from './sections/total';
import { footerSection } from './sections/footer';

/* Styles */
import { headerStyles } from './styles/header-styles';
import { subHeaderStyles } from './styles/sub-header-styles';
import { bodyStyles } from './styles/body-styles';
import { totalStyles } from './styles/total-styles';
import { footerStyles } from './styles/footer-styles';

const styles: StyleDictionary = {
  ...headerStyles,
  ...subHeaderStyles,
  ...bodyStyles,
  ...totalStyles,
  ...footerStyles
};

export function createTaxStampVoucherTemplate(data: ReportSchemeDto): TDocumentDefinitions {
  const { status, header, subHeader, body } = data

  // Execute the sections before the return statement
  const headerContent: Content = headerSection({
    header
  })

  const subHeaderContent: Content = subHeaderSection({
    subHeader
  })

  const bodyContent: Content = bodySection({
    withHolding: body.withHolding
  })

  const bodyTotalContent: Content = bodyTotalSection({
    body
  })

  const watermark = getWatermark(status)

  return {
    pageSize: 'LETTER',
    pageOrientation: 'portrait',
    pageMargins: [30, 480, 30, 100],
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
    content: {
      columns:[
        {
          stack: [
            bodyContent,
            bodyTotalContent
          ]
        }
      ]
    },
    footer: (currentPage, pageCount) => {
      const footerContent: Content = footerSection(currentPage, pageCount)
      return footerContent
    }
  }
}