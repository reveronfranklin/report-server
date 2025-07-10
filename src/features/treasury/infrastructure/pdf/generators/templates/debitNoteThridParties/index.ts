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

/* Sections */
 import { headerSection } from './sections/header';

/* Styles */
import { headerStyles } from './styles/header';

const styles: StyleDictionary = {
  ...headerStyles,
};

@Injectable()
export class DebitNoteThridPartiesPdf implements IPdfGenerator {
  private readonly logger = new Logger(DebitNoteThridPartiesPdf.name)

  constructor(
    private printerService: PrinterService
  ) {}

  async createDocumentDefinitions(reportSchemeData: ReportSchemeDto): Promise<TDocumentDefinitions> {
    this.logger.log(`generating PDF ${reportSchemeData.name} ...`)

    const { header, body } = reportSchemeData

    const headerContent: Content = headerSection({
      header
    })

    /* const bodyContent: Content = bodySection({
      body
    }) */

    return {
      pageSize: 'LETTER',
      pageOrientation: 'portrait',
      pageMargins: [20, 135, 60, 120],
      styles: styles,
      header: headerContent,
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