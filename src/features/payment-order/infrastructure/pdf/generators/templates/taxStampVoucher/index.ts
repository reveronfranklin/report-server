/* Dependencies */
import { Injectable, Logger } from '@nestjs/common';
import { IPdfGenerator } from '@shared/modules/printer/interfaces/pdf-generator.interface';
import { PrinterService } from '@shared/modules/printer/printer.service';

import type {
  TDocumentDefinitions,
  StyleDictionary,
  Content
} from 'pdfmake/interfaces';

/* Dtos */
import { ReportSchemeDto } from '../../../../../application/dtos/taxStampVoucher/report-scheme.dto';

/* Components */
import getWatermark from '../../../generators/components/watermark';

/* Sections */
import { headerSection } from './sections/header';
import { subHeaderSection } from './sections/sub-header';
import { bodySection } from './sections/body';
import { bodyTotalSection } from './sections/total';
import { footerSection } from './sections/footer';

/* Styles */
import { headerStyles } from './styles/header';
import { subHeaderStyles } from './styles/sub-header';
import { bodyStyles } from './styles/body';
import { totalStyles } from './styles/total';
import { footerStyles } from './styles/footer';

const styles: StyleDictionary = {
  ...headerStyles,
  ...subHeaderStyles,
  ...bodyStyles,
  ...totalStyles,
  ...footerStyles
};

@Injectable()
export class TaxStampVoucherPdf implements IPdfGenerator {
  private readonly logger = new Logger(TaxStampVoucherPdf.name)

  constructor(
    private printerService: PrinterService
  ) {}

  async createDocumentDefinitions(reportSchemeData: ReportSchemeDto): Promise<TDocumentDefinitions> {
    this.logger.log(`generating PDF ${reportSchemeData.name} ...`)

    const { status, header, subHeader, body } = reportSchemeData

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
      body,
      countWithHolding: body?.withHolding.length ?? 0
    })

    const watermark = getWatermark(status)

    return {
      pageSize: 'LETTER',
      pageOrientation: 'portrait',
      pageMargins: [25, 420, 25, 110],
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

  async generatePdf(documentDefinitions: TDocumentDefinitions): Promise<PDFKit.PDFDocument> {
    return this.printerService.createPdf(documentDefinitions)
  }
}