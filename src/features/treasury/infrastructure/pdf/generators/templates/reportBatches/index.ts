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
import headerMarginVariantStyles from './styles/header-margin-variant';
import footerStyles from '../../../generators/components/footer/styles';
import bodyStyles from './styles/body';

const styles: StyleDictionary = {
  ...headerStyles,
  ...headerMarginVariantStyles,
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

    const { header, body } = reportSchemeData

    const headerContent: Content = getHeaderSection(header[0])
    const bodyContent: Content = getBodySection(body[0])

    return {
      pageSize: 'LETTER',
      pageOrientation: 'portrait',
      pageMargins: [20, 140, 60, 160],
      styles: styles,
      header: headerContent,
      content: bodyContent,
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