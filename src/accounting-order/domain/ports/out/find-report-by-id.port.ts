import { BillOfLadingReportEntity } from '../../entities/bill-of-lading-report.entity';

export abstract class FindReportByIdPort {
  abstract findReportById(reportId: string): Promise<BillOfLadingReportEntity>;
}
