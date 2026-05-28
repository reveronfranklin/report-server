import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { BadRequestException } from '@exceptions/bad-request.exception';
import { ExternalServiceException } from '@exceptions/external-service.exception';
import { NotFoundException } from '@exceptions/not-found.exception';
import { IPersonnelListRepository } from '../../../domain/ports/personnel-list.repository';
import { IPersonnelListApiResponse } from '../../../domain/interfaces/personnel-list-api-response.interface';
import { ReportQueryDto } from '../../../application/dtos/personnelList/report-query.dto';
import { ReportSchemeDto } from '../../../application/dtos/personnelList/report-scheme.dto';
import { PersonnelListMapper } from '../mappers/personnel-list.mapper';
import { ReportQueryMapper } from '../mappers/report-query.mapper';

@Injectable()
export class PersonnelListAdapter implements IPersonnelListRepository {
  protected apiBaseUrl = this.configService.get<string>('api.ossmmasoft.verticalBaseUrl')

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async getPersonnelList(query: ReportQueryDto): Promise<ReportSchemeDto | null> {
    try {
      const payload = ReportQueryMapper.toApiPayload(query)
      const response = await firstValueFrom(
        this.httpService.post<IPersonnelListApiResponse>(`${this.apiBaseUrl}/ReportePersonal/GetAll`, payload)
      )

      const responseData = response.data

      if (!responseData?.data) {
        throw new NotFoundException('No data found in personnel list response')
      }

      if (responseData.isValid === false) {
        throw new BadRequestException(responseData.message || 'Invalid personnel list request')
      }

      if (responseData.data.length === 0) {
        throw new NotFoundException('Personnel list report not found')
      }

      return PersonnelListMapper.toReportSchemeDto(responseData.data)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }

      const errorMessage = this.getRequestErrorMessage(error)

      console.error(`Error getPersonnelList: ${errorMessage}`)
      throw new ExternalServiceException(`Error getPersonnelList -> ${errorMessage}`)
    }
  }

  private getRequestErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      const requestError = error as Error & {
        code?: string
        config?: { url?: string }
        response?: { status?: number; statusText?: string }
      }

      if (requestError.response?.status) {
        return `External API responded with status ${requestError.response.status} ${requestError.response.statusText || ''}`.trim()
      }

      if (requestError.code) {
        const url = requestError.config?.url ? ` (${requestError.config.url})` : ''
        return `${requestError.code}: ${requestError.message}${url}`
      }

      return requestError.message
    }

    return 'Unknown external service error'
  }
}
