import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DESCRIPTIVE_REPOSITORY } from './domain/repositories/descriptive.repository.interface';
import { DescriptiveRepository } from './infrastructure/persistence/descriptive.repository';
import { DescriptiveModel } from './infrastructure/persistence/descriptive.model';

@Module({
  imports: [
    SequelizeModule.forFeature([DescriptiveModel]),
  ],
  providers: [{
    provide: DESCRIPTIVE_REPOSITORY,
    useClass: DescriptiveRepository,
  }],
})
export class DescriptiveModule {}