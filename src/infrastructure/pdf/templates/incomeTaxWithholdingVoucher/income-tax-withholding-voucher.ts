import type {
  TDocumentDefinitions,
  StyleDictionary,
  Content
} from 'pdfmake/interfaces';

/* Dtos */
import { ReportSchemeDto } from '../../../../application/dtos/paymentOrder/report-scheme.dto';
//import { ReportSchemeDto } from '../../application/dtos/incomeTaxWithholdingVoucher/report-scheme.dto';

/* Sections */
import { headerSection } from './sections/income-tax-withholding-header';
import { subHeaderSection } from './sections/income-tax-withholding-sub-header';
import { bodySection } from './sections/income-tax-withholding-body';
import { footerSection } from './sections/income-tax-withholding-footer';

/* Styles */
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

export function createIncomeTaxWithholdingVoucherTemplate(data: ReportSchemeDto): TDocumentDefinitions {
  const { header, subHeader, body } = data

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

  const footerContent: Content = footerSection()

  return {
    pageSize: 'LETTER',
    pageOrientation: 'landscape',
    pageMargins: [20, 280, 60, 100],
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
    footer: footerContent
  }
}