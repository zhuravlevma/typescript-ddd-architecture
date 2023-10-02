import { randomUUID } from 'crypto';
import { ReportEntity } from '../entities/report.entity';
import {
  CreateReportCommand,
  CreateReportUseCase,
} from '../ports/in/create-report.use-case';
import { SaveReportPort } from '../ports/out/save-report.port';

export class CreateReportInteractor implements CreateReportUseCase {
  constructor(private readonly saveReport: SaveReportPort) {}

  async execute(
    createReportCommand: CreateReportCommand,
  ): Promise<ReportEntity> {
    const report = new ReportEntity({
      id: randomUUID(),
      orderId: createReportCommand.orderId,
      isValid: false,
      positions: [],
    });

    return this.saveReport.save(report);
  }
}
