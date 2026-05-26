import { Injectable, Logger } from '@nestjs/common';

import type {
  TDocumentDefinitions,
  StyleDictionary,
  Content
} from 'pdfmake/interfaces';

import { IPdfGenerator } from '@shared/modules/printer/interfaces/pdf-generator.interface';
import { PrinterService } from '@shared/modules/printer/printer.service';
import { ReportSchemeDto } from '../../../../../application/dtos/generalPayrollReport/report-scheme.dto';

// Componentes visuales exclusivos de tu reporte de nómina
/* import getHeaderSection from './components/header';
import getBodySection from './sections/body';
import getFooterSection from './components/footer'; */

// Estilos limpios combinados en un solo diccionario de pdfmake
/* import headerStyles from './components/header/styles';
import bodyStyles from './sections/styles/body';
import footerStyles from './components/footer/styles'; */

/* const styles: StyleDictionary = {
  ...headerStyles,
  ...bodyStyles,
  ...footerStyles
};
 */
@Injectable()
export class GeneralPayrollReportPdf implements IPdfGenerator {
  private readonly logger = new Logger(GeneralPayrollReportPdf.name);

  constructor(
    private readonly printerService: PrinterService // 🧙‍♂️ Aplicando tu nuevo estándar con acceso explícito
  ) {}

  async createDocumentDefinitions(reportSchemeData: ReportSchemeDto): Promise<TDocumentDefinitions> {
    this.logger.log(`generating PDF ${reportSchemeData.name} ...`);

    const { header: headers, body: bodies, footer: footers } = reportSchemeData;

    const allDocumentContent: Content[] = [];

    // Mantenemos tu mismo patrón de construcción dinámico por índice
/*     for (let i = 0; i < headers.length; i++) {
      const currentHeaderData = headers[i];
      const currentBodyData   = bodies[i];
      const currentFooterData = footers[i];

      allDocumentContent.push(getHeaderSection(currentHeaderData));
      allDocumentContent.push(getBodySection(currentBodyData));
      
      // Si necesitas pintar las firmas dentro del flujo del contenido directo
      if (currentFooterData) {
        allDocumentContent.push(getFooterSection(currentFooterData));
      }

      // Control de saltos de página idéntico a tu lógica de notas de débito
      if (i < headers.length - 1) {
        allDocumentContent.push({ text: '', pageBreak: 'after' });
      }
    } */

    return {
      pageSize: 'LETTER',
      pageOrientation: 'landscape',
      pageMargins: [20, 30, 60, 160],
     /*  styles: 'styles', */
      content: allDocumentContent,
      // Paginador dinámico nativo de pdfmake para el pie de página
      footer: (currentPage, pageCount) => {
        // Puedes pasarle el totalizador de páginas al componente visual
        return { text: `Página ${currentPage} de ${pageCount}`, alignment: 'center', style: 'pageNumber' };
      }
    }
  }

  async generatePdf(documentDefinitions: TDocumentDefinitions): Promise<PDFKit.PDFDocument> {
    // 🧙‍♂️ Acceso impecable a la propiedad inyectada usando "this."
    return this.printerService.createPdf(documentDefinitions);
  }
}