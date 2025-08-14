import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { NotFoundException } from '@exceptions/not-found.exception';
import { BadRequestException } from '@exceptions/bad-request.exception';
import { ExternalServiceException } from '@exceptions/external-service.exception';
import { IResponse } from '@interceptors/response.interface';
import { DebitNoteThirdPartiesMapper } from '../mappers/debit-note-third-parties/debit-note-third-parties.mapper';
import { PaymentBatchOriginMapper } from '../mappers/debit-note-third-parties/payment-batch-origin.mapper';
import { IPaymentBatchOriginRaw } from '../mappers/interfaces/payment-batch-origin-raw.interface';
import { IDebitNoteThirdPartiesRepository } from '../../../domain/ports/debit-note-third-parties.repository';
import { PaymentBatchEntity } from '../../../domain/entities/payment-batches.entity';
import { ReportSchemeDto } from '../../../application/dtos/debitNoteThirdParties/report-scheme.dto';

@Injectable()
export class DebitNoteThirdPartiesAdapter implements IDebitNoteThirdPartiesRepository {
  protected apiBaseUrl = this.configService.get<string>('api.ossmmasoft.baseUrl')

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async fecthPaymentBatches(payload: object): Promise<PaymentBatchEntity[] | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<IResponse<any>>(`${this.apiBaseUrl}/AdmPagosNotasTerceros/GetByLotePago`, payload)
      )

      const responseData = response.data

      if (!responseData?.data) {
        throw new NotFoundException('No data found in response')
      }

      if (responseData?.isValid == false || responseData.data.length === 0) {
        throw new BadRequestException('No payment batches found for the given payload')
      }

      return responseData.data.map((item: IPaymentBatchOriginRaw) =>
        PaymentBatchOriginMapper.toDomainEntity(item)
      )
    } catch (error) {
      console.error('Error fecthPaymentBatches:', error)
      throw new ExternalServiceException(`Error fecthPaymentBatches -> ${error.message}`)
    }
  }

  async getPaymentBatches(codigoLotePago: number): Promise<ReportSchemeDto | []> {
    try {
      const payload = {
        codigoLotePago,
        codigoPago: 0
      }

      const result = await this.fecthPaymentBatches(payload)

      if (result.length > 0) {
        return DebitNoteThirdPartiesMapper.toReportSchemeDto(result)
      } else {
        throw new NotFoundException(`No payment batches found for batchCode: ${codigoLotePago}`)
      }
    } catch (error) {
      console.error('Error getPaymentBatches:', error)
      throw new ExternalServiceException(`Error getPaymentBatches -> ${error.message}`)
    }
  }

  async getPaymentBatchByPaymentCode(codigoLotePago: number, codigoPago: number): Promise<ReportSchemeDto | null> {
    try {
      const payload = {
        codigoLotePago,
        codigoPago
      }

      const result = await this.fecthPaymentBatches(payload)

      if (result.length > 0) {
        return DebitNoteThirdPartiesMapper.toReportSchemeDto(result)
      } else {
        throw new NotFoundException(`No specific payment batch found for batchCode: ${codigoLotePago} and paymentCode ${codigoPago}`)
      }
    } catch (error) {
      console.error('Error getPaymentBatchByPaymentCode:', error)
      throw new ExternalServiceException(`Error getPaymentBatchByPaymentCode -> ${error.message}`)
    }
  }
}
