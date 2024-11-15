export interface IPdfGenerator {
  generatePdf(reportScheme: any, data: { logoPath: string }): Promise<PDFKit.PDFDocument>;
}