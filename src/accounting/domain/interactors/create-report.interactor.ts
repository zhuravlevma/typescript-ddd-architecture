import { BillOfLadingReportEntity } from '../entities/bill-of-lading-report.entity';
import {
  CreateReportDto,
  CreateReportUseCase,
} from '../ports/in/create-report.use-case';
import { SaveReportPort } from '../ports/out/save-report.port';
import { v4 as uuid } from 'uuid';

export class CreateReportInteractor implements CreateReportUseCase {
  constructor(private readonly saveReport: SaveReportPort) {}

  async execute(
    createReportDto: CreateReportDto,
  ): Promise<BillOfLadingReportEntity> {
    const report = new BillOfLadingReportEntity({
      id: uuid(),
      orderId: createReportDto.orderId,
      isValid: false,
      positions: [],
    });

    return this.saveReport.save(report);
  }
}
