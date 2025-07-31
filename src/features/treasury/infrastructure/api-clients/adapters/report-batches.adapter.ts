import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { CustomException } from '@exceptions/custom.exception';
import { IResponse } from '@interceptors/response.interface';

import { ReportBatchesMapper } from '../mappers/batches/report-batches.mapper';
import { BatchesOriginMapper } from '../mappers/batches/batches-origin.mapper';
import { IBatchesOriginRaw } from '../mappers/interfaces/batches-origin-raw.interface';
import { IReportBatchesRepository } from '../../../domain/ports/report-batches.repository';
import { PaymentBatchEntity } from '../../../domain/entities/payment-batches.entity';
import { ReportSchemeDto } from '../../../application/dtos/debitNoteThirdParties/report-scheme.dto';

@Injectable()
export class ReportBatchesAdapter implements IReportBatchesRepository {
  protected apiBaseUrl = this.configService.get<string>(
    'api.ossmmasoft.baseUrl'
  )

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async fecthBatches(payload: object): Promise<PaymentBatchEntity[] | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<IResponse<any>>(
          `${this.apiBaseUrl}/AdmNotaDebito/GetByLote`,
          payload
        )
      )

      const responseData = response.data;

      if (!responseData?.data) {
        console.warn('No data found in response:', response.data)
        return []
      }

      if (responseData.isValid == false || responseData.data.length === 0) {
        console.warn(
          'No batches found for the given payload:',
          payload
        )
        return []
      }

      return responseData.data.map((item: IBatchesOriginRaw) =>
        BatchesOriginMapper.toDomainEntity(item)
      )
    } catch (error) {
      console.error('Error fecthBatches:', error)
      throw new CustomException(
        `Error fecthBatches -> ${error.message}`
      )
    }
  }

  async getBatch(batchCode: number): Promise<ReportSchemeDto | []> {
    try {
      const payload = {
        codigoLote: batchCode
      }

      const result = await this.fecthBatches(payload)

      if (result.length > 0) {
        return ReportBatchesMapper.toReportSchemeDto(result)
      } else {
        console.warn(
          `No payment batches found for batchCode: ${batchCode}`,
          result
        )
      }
    } catch (error) {
      console.error('Error getBatch:', error)
      throw new CustomException(`Error getBatch -> ${error.message}`)
    }
  }
}