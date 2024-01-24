import { ReportReadModel } from '../../read-models/verification.read-model';

export interface FindReportWithPositionsParams {
  id: string;
}
export abstract class FindReportWithPositionsByIdInPort {
  abstract execute(
    findReportByIdQuery: FindReportWithPositionsParams,
  ): Promise<ReportReadModel>;
}
