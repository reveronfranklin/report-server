/* Dependencies */
import { Injectable } from '@nestjs/common';
import { IPdfGeneratorFactory } from '@shared/modules/printer/interfaces/pdf-generator-factory.interface';
import { IPdfGenerator } from '@shared/modules/printer/interfaces/pdf-generator.interface';

/* Generators */
import { DebitNoteThridPartiesPdf } from './generators/templates/debitNoteThridParties';
import { ReportBatchesPdf } from './generators/templates/reportBatches';

@Injectable()
export class PdfGeneratorFactory implements IPdfGeneratorFactory {
  private generators: Map<string, any>;

  constructor(
    private debitNoteThridPartiesPdf: DebitNoteThridPartiesPdf,
    private reportBatchesPdf: ReportBatchesPdf
  ) {
    this.generators = new Map()
    this.generators.set('debitNoteThridParties', debitNoteThridPartiesPdf)
    this.generators.set('reportBatches', reportBatchesPdf)
  }

  getGenerator(type: string): IPdfGenerator {
    const generator = this.generators.get(type)

    if (!generator) {
      throw new Error(`No PDF generator found for type: ${type}`)
    }

    return generator
  }
}