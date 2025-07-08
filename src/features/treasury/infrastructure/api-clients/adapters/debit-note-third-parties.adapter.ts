import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { CustomException } from '@exceptions/custom.exception';
import { IResponse } from '@interceptors/response.interface';
import { IDebitNoteThirdPartiesRepository } from '../../../domain/ports/debit-note-third-parties.repository';
import { PaymentBatchEntity } from '../../../domain/entities/payment-batches.entity';

@Injectable()
export class DebitNoteThirdPartiesAdapter implements IDebitNoteThirdPartiesRepository {
  protected apiBaseUrl = this.configService.get<string>('api.ossmmasoft.baseUrl')

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async getPaymentBatches(codigoLotePago: number): Promise<PaymentBatchEntity[] | null> {
    try {
      const payload = {
        codigoLotePago,
        codigoPago: 0
      }

      const response = await firstValueFrom(
        this.httpService.post<IResponse<PaymentBatchEntity[]>>(`${this.apiBaseUrl}/AdmPagosNotasTerceros/GetByLotePago`, payload)
      )

      console.log(`Fetching payment batches from C# API for batchCode: ${response}`)

      return null
    } catch (error) {
      console.error('Error fetching payment batches:', error)
      throw new CustomException(`Error fetching payment batches: ${error.message}`)
    }
  }

  async getPaymentBatchByPaymentCode(codigoLotePago: number, codigoPago: number): Promise<PaymentBatchEntity | null> {
    try {
      const payload = {
        codigoLotePago,
        codigoPago
      }

      const response = await firstValueFrom(
        this.httpService.post<IResponse<PaymentBatchEntity>>(`${this.apiBaseUrl}/AdmPagosNotasTerceros/GetByLotePago`, payload)
      )

      console.log(`Fetching payment batches from C# API for batchCode: ${response}`)

      return null
    } catch (error) {
      console.error('Error fetching specific payment batch:', error);
      throw new CustomException(`Error fetching specific payment batch: ${error.message}`)
    }
  }
}