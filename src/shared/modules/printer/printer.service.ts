import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: 'src/common/utils/fonts/Roboto-Regular.ttf',
    bold: 'src/common/utils/fonts/Roboto-Medium.ttf',
    italics: 'src/common/utils/fonts/Roboto-Italic.ttf',
    bolditalics: 'src/common/utils/fonts/Roboto-MediumItalic.ttf',
  }
}

@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fonts);

  createPdf(documentDefinitions: TDocumentDefinitions, options: BufferOptions = {}): PDFKit.PDFDocument {
    return this.printer.createPdfKitDocument(documentDefinitions, options)
  }
}