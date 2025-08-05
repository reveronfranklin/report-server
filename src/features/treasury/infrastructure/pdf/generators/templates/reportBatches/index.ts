import { Injectable, Logger } from '@nestjs/common';

import type {
  TDocumentDefinitions,
  StyleDictionary,
  Content
} from 'pdfmake/interfaces';

import { IPdfGenerator } from '@shared/modules/printer/interfaces/pdf-generator.interface';
import { PrinterService } from '@shared/modules/printer/printer.service';
import { ReportSchemeDto } from '../../../../../application/dtos/debitNoteThirdParties/report-scheme.dto';

import getHeaderSection from '../../components/header';
import getFooter from '../../../generators/components/footer';
import getBodySection from './sections/body';

import headerStyles from '../../components/header/styles';
import footerStyles from '../../../generators/components/footer/styles';
import bodyStyles from './styles/body';

const styles: StyleDictionary = {
  ...headerStyles,
  ...bodyStyles,
  ...footerStyles
};

@Injectable()
export class ReportBatchesPdf implements IPdfGenerator {
  private readonly logger = new Logger(ReportBatchesPdf.name)

  constructor(
    private printerService: PrinterService
  ) {}

  async createDocumentDefinitions(reportSchemeData: ReportSchemeDto): Promise<TDocumentDefinitions> {
    this.logger.log(`generating PDF ${reportSchemeData.name} ...`)

    const { header: headers, body: bodies } = reportSchemeData

    const allDocumentContent: Content[] = []
    const isThirdParties = (reportSchemeData.name === 'electronic-payment-third-parties')

    for (let i = 0; i < headers.length; i++) {
      const currentHeaderData = headers[i]
      const currentBodyData   = bodies[i]

      allDocumentContent.push(getHeaderSection(currentHeaderData))
      allDocumentContent.push(getBodySection(currentBodyData, isThirdParties))

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