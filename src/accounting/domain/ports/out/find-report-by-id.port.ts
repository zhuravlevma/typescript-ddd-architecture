import { ReportEntity } from '../../entities/report.entity';

export abstract class FindReportByIdPort {
  abstract findReportById(reportId: string): Promise<ReportEntity>;
}
