import { IDescriptive } from '../interfaces/descriptive.interface';

export class DescriptiveEntity implements IDescriptive {
  constructor(
    public code: string,
    public description: string,
    public descriptionId: number,
    public extra1: string | null,
    public extra2: string | null,
    public extra3: string | null,
  ) {}
}