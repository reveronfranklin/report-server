import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { CustomException } from '@exceptions/custom.exception';
import { IResponse } from '@interceptors/response.interface';
import { DebitNoteThirdPartiesMapper } from '../mappers/debit-note-third-parties.mapper';
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
        console.warn('No data found in response:', response.data)
        return []
      }

      if (responseData?.isValid == false || responseData.data.length === 0) {
        console.warn('No payment batches found for the given payload:', payload)
        return []
      }

      return responseData.data.map((item: any) => new PaymentBatchEntity(item))
    } catch (error) {
      console.error('Error fecthPaymentBatches:', error)
      throw new CustomException(`Error fecthPaymentBatches -> ${error.message}`)
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
        return DebitNoteThirdPartiesMapper.toDomain(result)
      } else {
        console.warn(`No payment batches found for batchCode: ${codigoLotePago}`, result)
      }
    } catch (error) {
      console.error('Error getPaymentBatches:', error)
      throw new CustomException(`Error getPaymentBatches -> ${error.message}`)
    }
  }

  async getPaymentBatchByPaymentCode(codigoLotePago: number, codigoPago: number):  Promise<ReportSchemeDto | null> {
    try {
      const payload = {
        codigoLotePago,
        codigoPago
      }

      const result = await this.fecthPaymentBatches(payload)

      if (result.length > 0) {
        return DebitNoteThirdPartiesMapper.toDomain(result)
      } else {
        console.warn(`No specific payment batch found for batchCode: ${codigoLotePago} and paymentCode ${codigoPago}`, result)
      }
    } catch (error) {
      console.error('Error getPaymentBatchByPaymentCode:', error);
      throw new CustomException(`Error getPaymentBatchByPaymentCode -> ${error.message}`)
    }
  }
}