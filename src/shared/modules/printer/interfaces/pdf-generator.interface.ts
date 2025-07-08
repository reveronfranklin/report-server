export interface IPdfGenerator {
  generatePdf(data: any): Promise<PDFKit.PDFDocument>;
}