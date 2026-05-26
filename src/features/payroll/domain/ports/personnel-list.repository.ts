import { ReportQueryDto } from '../../application/dtos/personnelList/report-query.dto';
import { ReportSchemeDto } from '../../application/dtos/personnelList/report-scheme.dto';

export interface IPersonnelListRepository {
  getPersonnelList(query: ReportQueryDto): Promise<ReportSchemeDto | null>;
}
