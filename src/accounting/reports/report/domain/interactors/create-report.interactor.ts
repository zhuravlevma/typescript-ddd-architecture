import { randomUUID } from 'crypto';
import { ReportEntity } from '../entities/report.entity';
import {
  CreateReportCommand,
  CreateReportInPort,
} from '../ports/in/create-report.in-port';
import { SaveReportOutPort } from '../ports/out/save-report.out-port';

export class CreateReportInteractor implements CreateReportInPort {
  constructor(private readonly saveReport: SaveReportOutPort) {}

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
