import { BillOfLadingReportEntity } from '../entities/bill-of-lading-report.entity';
import {
  UpdatePositionDto as UpdateReportDto,
  UpdatePositionUseCase,
} from '../ports/in/update-report.use-case';
import { FindReportByIdPort } from '../ports/out/find-report-by-id.port';
import { SaveReportPort } from '../ports/out/save-report.port';

export class UpdateReportInteractor implements UpdatePositionUseCase {
  constructor(
    private readonly findReportById: FindReportByIdPort,
    private readonly saveReportPort: SaveReportPort,
  ) {}

  async execute(
    updatePositionDto: UpdateReportDto,
  ): Promise<BillOfLadingReportEntity> {
    const report = await this.findReportById.findReportById(
      updatePositionDto.orderId,
    );

    updatePositionDto.isValid !== undefined ??
      (report.isValid = updatePositionDto.isValid);

    return this.saveReportPort.save(report);
  }
}
