import type { TDocumentDefinitions } from 'pdfmake/interfaces';
export interface IPdfGenerator {
  createDocumentDefinitions(data: any): Promise<TDocumentDefinitions>;
  generatePdf(data: TDocumentDefinitions): Promise<PDFKit.PDFDocument>;
}