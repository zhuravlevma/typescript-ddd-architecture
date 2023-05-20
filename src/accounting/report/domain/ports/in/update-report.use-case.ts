import { ReportEntity } from '../../entities/report.entity';

export interface UpdateReprotCommand {
  reportId: string;
  isValid?: boolean;
}

export abstract class UpdateReportUseCase {
  abstract execute(
    updateOrderCommand: UpdateReprotCommand,
  ): Promise<ReportEntity>;
}
