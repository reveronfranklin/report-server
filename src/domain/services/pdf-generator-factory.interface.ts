import { IPdfGenerator } from './pdf-generator.interface';

export interface IPdfGeneratorFactory {
  getGenerator(type: string): IPdfGenerator;
}