import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { NotFoundException } from '@exceptions/not-found.exception';
import { BadRequestException } from '@exceptions/bad-request.exception';
import { ExternalServiceException } from '@exceptions/external-service.exception';
import { IResponse } from '@interceptors/response.interface';
import { ReportBatchesMapper } from '../mappers/batches/report-batches.mapper';
import { BatchesOriginMapper } from '../mappers/batches/batches-origin.mapper';
import { IBatchesOriginRaw } from '../mappers/interfaces/batches-origin-raw.interface';
import { IReportBatchesRepository } from '../../../domain/ports/report-batches.repository';
import { PaymentBatchEntity } from '../../../domain/entities/payment-batches.entity';
import { ReportSchemeDto } from '../../../application/dtos/debitNoteThirdParties/report-scheme.dto';

@Injectable()
export class ReportBatchesAdapter implements IReportBatchesRepository {
  protected apiBaseUrl = this.configService.get<string>('api.ossmmasoft.baseUrl')

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async fecthBatches(payload: object): Promise<PaymentBatchEntity[] | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<IResponse<any>>(`${this.apiBaseUrl}/AdmNotaDebito/GetByLote`, payload)
      )

      const responseData = response.data

      if (!responseData?.data) {
        throw new NotFoundException('No data found in response')
      }

      if (responseData.isValid == false || responseData.data.length === 0) {
        throw new BadRequestException('No payment batches found for the given payload')
      }

      return responseData.data.map((item: IBatchesOriginRaw) =>
        BatchesOriginMapper.toDomainEntity(item)
      )
    } catch (error) {
      console.error('Error fecthBatches:', error)
      throw new ExternalServiceException(`Error fecthBatches -> ${error.message}`)
    }
  }

  async getBatch(batchCode: number, isThirdParties: boolean): Promise<ReportSchemeDto | []> {
    try {
      const payload = {
        codigoLote: batchCode
      }

      const result = await this.fecthBatches(payload)

      if (result.length > 0) {
        return ReportBatchesMapper.toReportSchemeDto(result, isThirdParties)
      } else {
        throw new NotFoundException(`No payment batches found for batchCode: ${batchCode}`)
      }
    } catch (error) {
      console.error('Error getBatch:', error)
      throw new ExternalServiceException(`Error getBatch -> ${error.message}`)
    }
  }
}