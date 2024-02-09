import { ReportEntity } from '../../entities/report.entity';

export interface FindReportByIdParams {
  id: string;
}
export abstract class FindReportByIdInPort {
  abstract execute(
    findReportByIdQuery: FindReportByIdParams,
  ): Promise<ReportEntity>;
}
