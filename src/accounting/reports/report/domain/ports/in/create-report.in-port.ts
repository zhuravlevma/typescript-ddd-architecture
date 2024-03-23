import { ReportEntity } from '../../entities/report.entity';

export interface CreateReportParams {
  orderId: string;
}

export abstract class CreateReportInPort {
  abstract execute(createReportParams: CreateReportParams): Promise<ReportEntity>;
}
