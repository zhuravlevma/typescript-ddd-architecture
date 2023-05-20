import { ReportEntity } from '../entities/report.entity';
import {
  CreateReportCommand,
  CreateReportUseCase,
} from '../ports/in/create-report.use-case';
import { SaveReportPort } from '../ports/out/save-report.port';
import { v4 as uuid } from 'uuid';

export class CreateReportInteractor implements CreateReportUseCase {
  constructor(private readonly saveReport: SaveReportPort) {}

  async execute(
    createReportCommand: CreateReportCommand,
  ): Promise<ReportEntity> {
    const report = new ReportEntity({
      id: uuid(),
      orderId: createReportCommand.orderId,
      isValid: false,
      positions: [],
    });

    return this.saveReport.save(report);
  }
}
