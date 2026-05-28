import { Injectable, Logger } from '@nestjs/common';
import type {
  Content,
  ContentImage,
  DynamicContent,
  StyleDictionary,
  TDocumentDefinitions
} from 'pdfmake/interfaces';

import { getCurrentDate } from '@shared/utils';
import { IPdfGenerator } from '@shared/modules/printer/interfaces/pdf-generator.interface';
import { PrinterService } from '@shared/modules/printer/printer.service';
import { ReportSchemeDto } from '../../../../../application/dtos/personnelList/report-scheme.dto';
import getDepartmentHeaderSection from './sections/department-header';
import getPersonnelTableSection from './sections/table';
import { getDepartmentTotalsSection, getGrandTotalsSection } from './sections/totals';
import headerStyles from './styles/header';
import bodyStyles from './styles/body';
import totalStyles from './styles/totals';

const styles: StyleDictionary = {
  ...headerStyles,
  ...bodyStyles,
  ...totalStyles
}

@Injectable()
export class PersonnelListPdf implements IPdfGenerator {
  private readonly logger = new Logger(PersonnelListPdf.name)

  constructor(
    private printerService: PrinterService
  ) {}

  async createDocumentDefinitions(reportSchemeData: ReportSchemeDto): Promise<TDocumentDefinitions> {
    this.logger.log(`generating PDF ${reportSchemeData.header.title} ...`)

    const content = this.getDocumentContent(reportSchemeData)

    return {
      pageSize: 'LETTER',
      pageOrientation: 'landscape',
      pageMargins: [20, 115, 20, 24],
      styles,
      header: this.getHeader(reportSchemeData),
      content
    }
  }

  async generatePdf(documentDefinitions: TDocumentDefinitions): Promise<PDFKit.PDFDocument> {
    return this.printerService.createPdf(documentDefinitions)
  }

  private getDocumentContent(reportSchemeData: ReportSchemeDto): Content[] {
    const content: Content[] = []
    const departments = reportSchemeData.body.departments

    departments.forEach((department, index) => {
      const departmentContent: Content[] = [
        getDepartmentHeaderSection(department),
        getPersonnelTableSection(department),
        getDepartmentTotalsSection(department)
      ]

      if (index > 0) {
        departmentContent[0] = {
          ...departmentContent[0] as object,
          pageBreak: 'before'
        } as Content
      }

      content.push(...departmentContent)
    })

    content.push(getGrandTotalsSection(reportSchemeData.summary))

    return content
  }

  private getHeader(reportSchemeData: ReportSchemeDto): DynamicContent {
    return (currentPage: number, pageCount: number): Content => ({
      margin: [20, 18, 20, 0],
      table: {
        widths: ['25%', '50%', '25%'],
        body: [
          [
            {
              text: 'Republica Bolivariana de Venezuela',
              style: 'reportHeader',
              border: [true, true, false, false]
            },
            {
              text: `FECHA DE EMISION: ${getCurrentDate()}`,
              style: 'reportHeaderMeta',
              colSpan: 2,
              border: [false, true, true, false]
            },
            {}
          ],
          [
            {
              image: 'src/assets/logoLeft.jpeg',
              width: 78,
              margin: [72, 14, 0, 0],
              border: [true, false, false, false]
            } as ContentImage,
            {
              text: reportSchemeData.header.title,
              style: 'reportHeaderTitle',
              margin: [0, 24, 0, 0],
              border: [false, false, false, false]
            },
            {
              text: `Pagina ${currentPage} de ${pageCount}`,
              style: 'reportHeaderMeta',
              margin: [0, 24, 0, 0],
              border: [false, false, true, false]
            }
          ],
          [
            {
              text: reportSchemeData.header.payrollType,
              colSpan: 3,
              alignment: 'center',
              fontSize: 7,
              margin: [0, 4, 0, 8],
              border: [true, false, true, true]
            },
            {},
            {}
          ]
        ]
      },
      layout: {
        paddingLeft: () => 6,
        paddingRight: () => 6,
        paddingTop: () => 2,
        paddingBottom: () => 2,
        hLineWidth: () => 0.75,
        vLineWidth: () => 0.75
      }
    } as Content)
  }
}
