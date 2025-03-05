import type {
  TDocumentDefinitions,
  StyleDictionary,
  Content
} from 'pdfmake/interfaces';

/* Dtos */
import { ReportSchemeDto } from '../../../../application/dtos/incomeTaxWithholdingVoucher/report-scheme.dto';

/* Components */
import getWatermark from '../../components/watermark';
import getFooter from '../../components/footer';

/* Sections */
import { headerSection } from './sections/income-tax-withholding-header';
import { subHeaderSection } from './sections/income-tax-withholding-sub-header';
import { bodySection } from './sections/income-tax-withholding-body';

/* Styles */
import { headerStyles } from './styles/header-styles';
import { subHeaderStyles } from './styles/sub-header-styles';
import { bodyStyles } from './styles/body-styles';
import { footerStyles } from '../../components/footer/styles';

const styles: StyleDictionary = {
  ...headerStyles,
  ...subHeaderStyles,
  ...bodyStyles,
  ...footerStyles
};

export function createIncomeTaxWithholdingVoucherTemplate(data: ReportSchemeDto): TDocumentDefinitions {
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
    pageOrientation: 'landscape',
    pageMargins: [20, 280, 60, 100],
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