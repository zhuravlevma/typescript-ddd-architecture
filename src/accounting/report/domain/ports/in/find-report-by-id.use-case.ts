import { ReportEntity } from '../../entities/report.entity';

export abstract class FindReportByIdUseCase {
  abstract execute(reportId: string): Promise<ReportEntity>;
}
