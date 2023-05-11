import { BillOfLadingReportEntity } from '../../entities/bill-of-lading-report.entity';

export abstract class FindReportByIdUseCase {
  abstract execute(reportId: string): Promise<BillOfLadingReportEntity>;
}
