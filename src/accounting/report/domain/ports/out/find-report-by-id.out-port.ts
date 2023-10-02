import { ReportEntity } from '../../entities/report.entity';

export abstract class FindReportByIdOutPort {
  abstract findReportById(reportId: string): Promise<ReportEntity>;
}
