import { Injectable, Logger } from '@nestjs/common';

import type {
  TDocumentDefinitions,
  StyleDictionary,
  Content
} from 'pdfmake/interfaces';

import { IPdfGenerator } from '@shared/modules/printer/interfaces/pdf-generator.interface';
import { PrinterService } from '@shared/modules/printer/printer.service';
import { ReportSchemeDto } from '../../../../../application/dtos/debitNoteThirdParties/report-scheme.dto';

import getHeaderSection from './sections/header';
import getBodySection from './sections/body';
import getFooter from './sections/footer';

import headerStyles from './styles/header';
import bodyStyles from './styles/body';
import footerStyles from './styles/footer';

const styles: StyleDictionary = {
  ...headerStyles,
  ...bodyStyles,
  ...footerStyles
};

@Injectable()
export class DebitNoteThridPartiesPdf implements IPdfGenerator {
  private readonly logger = new Logger(DebitNoteThridPartiesPdf.name)

  constructor(
    private printerService: PrinterService
  ) {}

  async createDocumentDefinitions(reportSchemeData: ReportSchemeDto): Promise<TDocumentDefinitions> {
    this.logger.log(`generating PDF ${reportSchemeData.name} ...`)

    const { header: headers, body: bodies } = reportSchemeData

    const allDocumentContent: Content[] = []

    for (let i = 0; i < headers.length; i++) {
      const currentHeaderData = headers[i]
      const currentBodyData   = bodies[i]

      allDocumentContent.push(getHeaderSection(currentHeaderData))
      allDocumentContent.push(getBodySection(currentBodyData))

      if (i < headers.length - 1) {
        allDocumentContent.push({ text: '', pageBreak: 'after' })
      }
    }

    return {
      pageSize: 'LETTER',
      pageOrientation: 'portrait',
      pageMargins: [20, 30, 60, 160],
      styles: styles,
      content: allDocumentContent,
      footer: (currentPage, pageCount) => {
        const footerContent: Content = getFooter(currentPage, pageCount)
        return footerContent
      }
    }
  }

  async generatePdf(documentDefinitions: TDocumentDefinitions): Promise<PDFKit.PDFDocument> {
    return this.printerService.createPdf(documentDefinitions)
  }
}