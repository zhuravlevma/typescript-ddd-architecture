import { ReportEntity } from '../../entities/report.entity';

export interface UpdateReportParams {
  reportId: string;
  isValid?: boolean;
}

export abstract class UpdateReportInPort {
  abstract execute(updateOrderParams: UpdateReportParams): Promise<ReportEntity>;
}
