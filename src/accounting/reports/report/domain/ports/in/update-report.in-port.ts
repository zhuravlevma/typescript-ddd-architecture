import { ReportEntity } from '../../entities/report.entity';

export interface UpdateReprotCommand {
  reportId: string;
  isValid?: boolean;
}

export abstract class UpdateReportInPort {
  abstract execute(
    updateOrderCommand: UpdateReprotCommand,
  ): Promise<ReportEntity>;
}
