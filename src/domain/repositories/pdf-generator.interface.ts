export interface IPdfGenerator {
  generatePdf(reportScheme: any): Promise<PDFKit.PDFDocument>;
}