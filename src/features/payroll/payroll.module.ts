import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from '@shared/shared.module';

import { PersonnelListService } from './application/services/personnel-list.service';
import { PersonnelListAdapter } from './infrastructure/api-clients/adapters/personnel-list.adapter';
import { PersonnelListController } from './infrastructure/http/controllers/personnel-list.controller';
import { PdfGeneratorFactory } from './infrastructure/pdf/pdf-generator.factory';
import { PersonnelListPdf } from './infrastructure/pdf/generators/templates/personnelList';

@Module({
  imports: [
    SharedModule,
    HttpModule
  ],
  controllers: [
    PersonnelListController
  ],
  providers: [
    PersonnelListService,
    PersonnelListPdf,
    {
      provide: 'IPersonnelListRepository',
      useClass: PersonnelListAdapter
    },
    {
      provide: 'IPdfGeneratorFactory',
      useClass: PdfGeneratorFactory
    }
  ]
})
export class PayrollModule {}
