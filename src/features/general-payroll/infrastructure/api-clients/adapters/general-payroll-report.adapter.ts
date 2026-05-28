import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { plainToInstance, instanceToPlain } from 'class-transformer';

import { NotFoundException } from '@exceptions/not-found.exception';
import { BadRequestException } from '@exceptions/bad-request.exception';
import { ExternalServiceException } from '@exceptions/external-service.exception';
import { IResponse } from '@interceptors/response.interface';

import { IPayrollReportRepository } from '../../../domain/ports/report-payroll.repository';
import { IPayrollFilter } from '../../../domain/interfaces/payroll-filter.interface';
import { PayrollReportEntity } from '../../../domain/entities/payroll-report.entity';
import { ReportQueryApiDto } from '../dtos/report-query-api.dto';
import { IExternalPayrollData } from '../interfaces/payroll-external-response.interface';
import { OriginGeneralPayrollDataMapper } from '../mappers/origin-general-payroll-data.mapper';
import { GeneralPayrollReportMapper } from '../mappers/general-payroll-report.mapper';
import { ReportSchemeDto } from '../../../application/dtos/generalPayrollReport/report-scheme.dto';

@Injectable()
export class PayrollReportAdapter implements IPayrollReportRepository {
  protected apiBaseUrl = this.configService.get<string>('api.ossmmasoft.baseUrlVertical');

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  protected async fetchPayrollData(payload: object): Promise<PayrollReportEntity | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<IResponse<IExternalPayrollData>>(
          `${this.apiBaseUrl}/ReporteGeneralNominaCompletoGetAll/GetAll`,
          payload
        )
      )

      const responseData = response.data

      if (!responseData?.data) {
        throw new NotFoundException('No data found in payroll response')
      }

      if (responseData.isValid === false) {
        throw new BadRequestException('No payroll records found for the given payload')
      }

      return OriginGeneralPayrollDataMapper.toDomainEntity(responseData.data)

    } catch (error: any) {
      console.error('Error fetchPayrollData:', error);
      throw new ExternalServiceException(`Error fetchPayrollData -> ${error?.message}`)
    }
  }

  async getPayrollReport(filter: IPayrollFilter): Promise<ReportSchemeDto | null> {
    try {
      const dtoInstance = plainToInstance(ReportQueryApiDto, filter)
      const payload     = instanceToPlain(dtoInstance)

      const result = await this.fetchPayrollData(payload)

      if (result) {
        return GeneralPayrollReportMapper.toReportSchemeDto(result)
      } else {
        throw new NotFoundException(`No payroll report found for the given filters`)
      }
    } catch (error: any) {
      console.error('Error getPayrollReport:', error)

      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error
      }
      throw new ExternalServiceException(`Error getPayrollReport -> ${error?.message}`)
    }
  }
}