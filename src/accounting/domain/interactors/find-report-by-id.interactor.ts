import { BillOfLadingReportEntity } from '../entities/bill-of-lading-report.entity';
import { FindReportByIdUseCase } from '../ports/in/find-report-by-id.use-case';
import { FindReportByIdPort } from '../ports/out/find-report-by-id.port';

export class FindReportByIdInteractor implements FindReportByIdUseCase {
  constructor(private readonly findReportByIdPort: FindReportByIdPort) {}

  execute(reportId: string): Promise<BillOfLadingReportEntity> {
    return this.findReportByIdPort.findReportById(reportId);
  }
}
