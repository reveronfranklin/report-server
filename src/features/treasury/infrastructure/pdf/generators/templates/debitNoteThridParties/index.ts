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
import { ReportSchemeDto } from '../../../../../application/dtos/debitNoteThirdParties/report-scheme.dto';

/* Components */
/* import getWatermark from '../../../generators/components/watermark';
import getFooter from '../../../generators/components/footer'; */

/* Sections */
/* import { headerSection } from './sections/header';
import { subHeaderSection } from './sections/sub-header';
import { bodySection } from './sections/body'; */

/* Styles */
/* import { headerStyles } from './styles/header';
import { subHeaderStyles } from './styles/sub-header';
import { bodyStyles } from './styles/body';
import { footerStyles } from '../../../generators/components/footer/styles'; */

/* const styles: StyleDictionary = {
  ...headerStyles,
  ...subHeaderStyles,
  ...bodyStyles,
  ...footerStyles
};
 */
@Injectable()
export class DebitNoteThridPartiesPdf implements IPdfGenerator {
  private readonly logger = new Logger(DebitNoteThridPartiesPdf.name)

  constructor(
    private printerService: PrinterService
  ) {}

  async createDocumentDefinitions(reportSchemeData: ReportSchemeDto): Promise<TDocumentDefinitions> {
    this.logger.log(`generating PDF ${reportSchemeData.name} ...`)

    const { header, body } = reportSchemeData

/*     const headerContent: Content = headerSection({
      header
    })

    const subHeaderContent: Content = subHeaderSection({
      subHeader
    })

    const bodyContent: Content = bodySection({
      body
    })

    const watermark = getWatermark(status) */

    return {
      pageSize: 'LETTER',
      pageOrientation: 'portrait',
      pageMargins: [20, 215, 60, 120],
      /* styles: styles, */
      /* watermark: watermark, */
      header: {
        columns: [
          {
            stack: [
              'headerContent',
              'subHeaderContent'
            ]
          }
        ]
      },
      content: 'bodyContent',
      footer: 'footer'/*  (currentPage, pageCount) => {
        const footerContent: Content = getFooter(currentPage, pageCount)
        return footerContent
      } */
    }
  }

  async generatePdf(documentDefinitions: TDocumentDefinitions): Promise<PDFKit.PDFDocument> {
    return this.printerService.createPdf(documentDefinitions)
  }
}