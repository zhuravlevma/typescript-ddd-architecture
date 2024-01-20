import { ReportEntity } from '../../entities/report.entity';

export interface FindReportByIdQuery {
  id: string;
}
export abstract class FindReportByIdInPort {
  abstract execute(
    findReportByIdQuery: FindReportByIdQuery,
  ): Promise<ReportEntity>;
}
