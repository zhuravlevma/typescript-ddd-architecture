import { ReportEntity } from '../../entities/report.entity';

export interface CreateReportCommand {
  orderId: string;
}

export abstract class CreateReportUseCase {
  abstract execute(
    createReportCommand: CreateReportCommand,
  ): Promise<ReportEntity>;
}
