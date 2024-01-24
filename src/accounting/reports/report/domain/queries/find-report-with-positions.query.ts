import {
  FindReportWithPositionsByIdInPort,
  FindReportWithPositionsParams,
} from '../ports/in/find-report-with-positions-by-id.in-port';
import { FindReportWithPositionsByOutPort } from '../ports/out/find-report-with-positions-by-id.out-port';
import { ReportReadModel } from '../read-models/verification.read-model';

export class FindReportWithPositionsQuery
  implements FindReportWithPositionsByIdInPort
{
  constructor(
    private readonly findReportWithPositionsByIdPort: FindReportWithPositionsByOutPort,
  ) {}
  execute(
    findReportByIdQuery: FindReportWithPositionsParams,
  ): Promise<ReportReadModel> {
    return this.findReportWithPositionsByIdPort.findReportWithPositionsByOutInPort(
      findReportByIdQuery,
    );
  }
}
