import { Injectable } from '@nestjs/common';
import { IPdfGeneratorFactory } from '@shared/modules/printer/interfaces/pdf-generator-factory.interface';
import { IPdfGenerator } from '@shared/modules/printer/interfaces/pdf-generator.interface';
import { PersonnelListPdf } from './generators/templates/personnelList';

@Injectable()
export class PdfGeneratorFactory implements IPdfGeneratorFactory {
  private generators: Map<string, IPdfGenerator>;

  constructor(
    private personnelListPdf: PersonnelListPdf
  ) {
    this.generators = new Map()
    this.generators.set('personnelList', personnelListPdf)
  }

  getGenerator(type: string): IPdfGenerator {
    const generator = this.generators.get(type)

    if (!generator) {
      throw new Error(`No PDF generator found for type: ${type}`)
    }

    return generator
  }
}
