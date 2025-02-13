import type {
  TDocumentDefinitions,
  StyleDictionary,
  Content
} from 'pdfmake/interfaces';

/* Dtos */
import { ReportSchemeDto } from '../../../../application/dtos/vatWithholdingVoucher/report-scheme.dto';

/* Sections */
import { headerSection } from './sections/vat-withholding-header';
import { subHeaderSection } from './sections/vat-withholding-sub-header';
import { bodySection } from './sections/vat-withholding-body';
import { footerSection } from './sections/vat-withholding-footer';

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

export function createVatWithholdingVoucherTemplate(data: ReportSchemeDto): TDocumentDefinitions {
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
    pageMargins: [20, 280, 20, 100],
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