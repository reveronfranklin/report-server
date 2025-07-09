/* Dependencies */
import { Injectable } from '@nestjs/common';
import { IPdfGeneratorFactory } from '@shared/modules/printer/interfaces/pdf-generator-factory.interface';
import { IPdfGenerator } from '@shared/modules/printer/interfaces/pdf-generator.interface';

/* Generators */
import { DebitNoteThridPartiesPdf } from './generators/templates/DebitNoteThridParties';

@Injectable()
export class PdfGeneratorFactory implements IPdfGeneratorFactory {
  private generators: Map<string, any>;

  constructor(
    private debitNoteThridPartiesPdf: DebitNoteThridPartiesPdf
  ) {
    this.generators = new Map()
    this.generators.set('debitNoteThridParties', debitNoteThridPartiesPdf)
  }

  getGenerator(type: string): IPdfGenerator {
    const generator = this.generators.get(type)

    if (!generator) {
      throw new Error(`No PDF generator found for type: ${type}`)
    }

    return generator
  }
}