import { Inject, Injectable } from '@nestjs/common';

import { BadRequestException } from '@exceptions/bad-request.exception';
import { ExternalServiceException } from '@exceptions/external-service.exception';
import { NotFoundException } from '@exceptions/not-found.exception';
import { IPdfGeneratorFactory } from '@shared/modules/printer/interfaces/pdf-generator-factory.interface';
import { IPersonnelListRepository } from '../../domain/ports/personnel-list.repository';
import { ReportQueryDto } from '../dtos/personnelList/report-query.dto';
import { ReportSchemeDto } from '../dtos/personnelList/report-scheme.dto';

@Injectable()
export class PersonnelListService {
  constructor(
    @Inject('IPersonnelListRepository')
    private personnelListRepository: IPersonnelListRepository,
    @Inject('IPdfGeneratorFactory')
    private pdfGeneratorFactory: IPdfGeneratorFactory
  ) {}

  async generateReport(query: ReportQueryDto): Promise<PDFKit.PDFDocument> {
    if (!query.payrollTypeCode) {
      throw new BadRequestException('Invalid parameters: codigoTipoNomina is required')
    }

    const personnelListData: ReportSchemeDto | null = await this.personnelListRepository.getPersonnelList(query)

    if (!personnelListData) {
      throw new NotFoundException('Personnel List Report not found')
    }

    try {
      const pdfGenerator = this.pdfGeneratorFactory.getGenerator('personnelList')
      const pdfDocumentDefinitions = await pdfGenerator.createDocumentDefinitions(personnelListData)
      const pdfDocument = await pdfGenerator.generatePdf(pdfDocumentDefinitions)

      return pdfDocument
    } catch (error: any) {
      console.error('generateReport -> error', error)
      throw new ExternalServiceException(`Error generating report PersonnelListService -> ${error.message}`)
    }
  }
}
