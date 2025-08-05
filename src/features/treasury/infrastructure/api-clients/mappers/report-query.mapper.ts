import { ReportQueryDto } from '../../../application/dtos/report-query.dto';
import { ReportQueryApiDto } from '../dtos/report-query-api.dto';

export class ReportQueryMapper {
  public static toApplicationDto(apiDto: ReportQueryApiDto): ReportQueryDto {
    const applicationDto = new ReportQueryDto()

    applicationDto.paymentBatchCode = apiDto.codigoLotePago
    applicationDto.paymentCode      = apiDto.codigoPago

    return applicationDto
  }
}