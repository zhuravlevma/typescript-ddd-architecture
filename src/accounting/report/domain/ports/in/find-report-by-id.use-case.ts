import { ReportEntity } from '../../entities/report.entity';

export interface FindReportByIdQuery {
  id: string;
}
export abstract class FindReportByIdUseCase {
  abstract execute(
    findReportByIdQuery: FindReportByIdQuery,
  ): Promise<ReportEntity>;
}
