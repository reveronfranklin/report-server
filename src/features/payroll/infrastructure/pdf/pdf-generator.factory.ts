/* Dependencies */
import { Injectable } from '@nestjs/common';
import { IPdfGeneratorFactory } from '@shared/modules/printer/interfaces/pdf-generator-factory.interface';
import { IPdfGenerator } from '@shared/modules/printer/interfaces/pdf-generator.interface';

/* Generators */
import { GeneralPayrollReportPdf } from './generators/templates/generalPayrollReport';

@Injectable()
export class PdfGeneratorFactory implements IPdfGeneratorFactory {
  private readonly generators: Map<string, IPdfGenerator>;

  constructor(
    private readonly generalPayrollReportPdf: GeneralPayrollReportPdf
  ) {
    this.generators = new Map()
    this.generators.set('generalPayrollReports', this.generalPayrollReportPdf)
  }

   public getGenerator(type: string): IPdfGenerator {
    const generator = this.generators.get(type);

    if (!generator) {
      throw new Error(`[PayrollModule] No PDF generator found for type: ${type}`)
    }

    return generator
  }
}