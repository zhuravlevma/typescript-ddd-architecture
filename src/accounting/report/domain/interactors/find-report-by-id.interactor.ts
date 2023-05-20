import { ReportEntity } from '../entities/report.entity';
import {
  FindReportByIdQuery,
  FindReportByIdUseCase,
} from '../ports/in/find-report-by-id.use-case';
import { FindReportByIdPort } from '../ports/out/find-report-by-id.port';

export class FindReportByIdInteractor implements FindReportByIdUseCase {
  constructor(private readonly findReportByIdPort: FindReportByIdPort) {}

  execute(findReportByIdQuery: FindReportByIdQuery): Promise<ReportEntity> {
    return this.findReportByIdPort.findReportById(findReportByIdQuery.id);
  }
}
