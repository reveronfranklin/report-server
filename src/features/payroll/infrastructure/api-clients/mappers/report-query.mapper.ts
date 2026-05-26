import { ReportQueryDto } from '../../../application/dtos/personnelList/report-query.dto';
import { ReportQueryApiDto } from '../dtos/report-query-api.dto';

export class ReportQueryMapper {
  static toApplicationDto(reportQueryApiDto: ReportQueryApiDto): ReportQueryDto {
    return {
      payrollTypeCode: reportQueryApiDto.codigoTipoNomina,
      status: reportQueryApiDto.status
    }
  }

  static toApiPayload(reportQueryDto: ReportQueryDto): object {
    return {
      codigoTipoNomina: reportQueryDto.payrollTypeCode,
      status: reportQueryDto.status
    }
  }
}
