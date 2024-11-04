// src/features/beneficiary/beneficiary.module.ts

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BeneficiaryModel } from './infrastructure/persistence/beneficiary.model';
import { BeneficiaryRepository } from './infrastructure/persistence/beneficiary.repository';

@Module({
  imports: [SequelizeModule.forFeature([BeneficiaryModel])],
  providers: [
    {
      provide: 'IBeneficiaryRepository',
      useClass: BeneficiaryRepository,
    },
  ],
  exports: ['IBeneficiaryRepository'],
})
export class BeneficiaryModule {}