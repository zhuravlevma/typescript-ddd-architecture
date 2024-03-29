import { ReportEntity } from '../entities/report.entity';
import {
  FindReportByIdParams,
  FindReportByIdInPort,
} from '../ports/in/find-report-by-id.in-port';
import { FindReportByIdOutPort } from '../ports/out/find-report-by-id.out-port';

export class FindReportByIdQuery implements FindReportByIdInPort {
  constructor(private readonly findReportByIdPort: FindReportByIdOutPort) {}

  execute(findReportByIdQuery: FindReportByIdParams): Promise<ReportEntity> {
    return this.findReportByIdPort.findReportById(findReportByIdQuery.id);
  }
}
