import { Injectable, Logger } from '@nestjs/common';

import type {
  TDocumentDefinitions,
  StyleDictionary,
  Content
} from 'pdfmake/interfaces';

import { IPdfGenerator } from '@shared/modules/printer/interfaces/pdf-generator.interface';
import { PrinterService } from '@shared/modules/printer/printer.service';
import { ReportSchemeDto } from '../../../../../application/dtos/generalPayrollReport/report-scheme.dto';

import getStaticHeaderSection from '../../components/header/static-header';
import getDynamicHeaderSection from './sections/header';
import getBodySection from './sections/body';
import getFooterSignatures from './sections/footer';

import StaticHeaderStyles from '../../components/header/static-header-styles';
import headerStyles from './styles/header';
import footerStyles from './styles/footer';
import bodyStyles from './styles/body';

const styles: StyleDictionary = {
  ...StaticHeaderStyles,
  ...headerStyles,
  ...bodyStyles,
  ...footerStyles
};

@Injectable()
export class GeneralPayrollReportPdf implements IPdfGenerator {
  private readonly logger = new Logger(GeneralPayrollReportPdf.name)

  constructor(
    private printerService: PrinterService
  ) {}

  async createDocumentDefinitions(reportSchemeData: ReportSchemeDto): Promise<TDocumentDefinitions> {
    this.logger.log(`Generating PDF ${reportSchemeData.name} ...`)

    const { staticHeader: staticHeader, header: headers, body: bodies, footer: footers } = reportSchemeData

    const allDocumentContent: Content[] = []

    const dynamicHeaderContent: Content = getDynamicHeaderSection(headers)
    const payrollBodyContent: Content   = getBodySection(bodies)
    const payrollFooterContent: Content = getFooterSignatures(footers)

    allDocumentContent.push(dynamicHeaderContent)
    allDocumentContent.push(payrollBodyContent)
    allDocumentContent.push(payrollFooterContent)

    return {
      pageSize: 'LETTER',
      pageOrientation: 'landscape',
      pageMargins: [20, 80, 20, 80],
      styles: styles,
      header: (currentPage, pageCount) => {
        const headerContent: Content = getStaticHeaderSection(currentPage, pageCount, staticHeader)
        return headerContent
      },
      content: allDocumentContent
    }
  }

  async generatePdf(documentDefinitions: TDocumentDefinitions): Promise<PDFKit.PDFDocument> {
    return this.printerService.createPdf(documentDefinitions)
  }
}