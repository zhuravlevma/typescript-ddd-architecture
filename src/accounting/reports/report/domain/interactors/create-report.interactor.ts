import { randomUUID } from 'crypto';
import { ReportEntity } from '../entities/report.entity';
import {
  CreateReportParams,
  CreateReportInPort,
} from '../ports/in/create-report.in-port';
import { SaveReportOutPort } from '../ports/out/save-report.out-port';
import { ReportPositionEntity } from '../entities/report-position.entity';
import { AmountObjectValue } from '../object-values/amount.object-value';

export class CreateReportInteractor implements CreateReportInPort {
  constructor(private readonly saveReportPort: SaveReportOutPort) {}

  async execute(
    createReportCommand: CreateReportParams,
  ): Promise<ReportEntity> {
    const report = new ReportEntity({
      id: randomUUID(),
      orderId: createReportCommand.orderId,
      isValid: false,
      reportNumber: 1213314,
      positions: [
        new ReportPositionEntity({
          id: randomUUID(),
          name: 'empty position',
          count: 0,
          code: 0,
          weight: 0,
          isValid: false,
          amount: new AmountObjectValue({
            amount: 100,
            rate: 0,
          }),
        }),
      ],
    });

    return this.saveReportPort.save(report);
  }
}
