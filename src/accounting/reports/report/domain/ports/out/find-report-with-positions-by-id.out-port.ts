import { ReportReadModel } from '../../read-models/report.read-model';

export interface FindReportWithPositionsParams {
  id: string;
}
export abstract class FindReportWithPositionsByOutPort {
  abstract findReportWithPositionsByOutInPort(
    findReportByIdQuery: FindReportWithPositionsParams,
  ): Promise<ReportReadModel>;
}
