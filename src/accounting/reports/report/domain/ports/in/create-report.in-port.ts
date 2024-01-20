import { ReportEntity } from '../../entities/report.entity';

export interface CreateReportCommand {
  orderId: string;
}

export abstract class CreateReportInPort {
  abstract execute(
    createReportCommand: CreateReportCommand,
  ): Promise<ReportEntity>;
}
