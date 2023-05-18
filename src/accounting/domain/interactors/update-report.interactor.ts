import { BillOfLadingReportEntity } from '../entities/bill-of-lading-report.entity';
import {
  UpdateReprotDto as UpdateReportDto,
  UpdateReportUseCase,
} from '../ports/in/update-report.use-case';
import { FindReportByIdPort } from '../ports/out/find-report-by-id.port';
import { SaveReportPort } from '../ports/out/save-report.port';

export class UpdateReportInteractor implements UpdateReportUseCase {
  constructor(
    private readonly findReportById: FindReportByIdPort,
    private readonly saveReportPort: SaveReportPort,
  ) {}

  async execute(
    updatePositionDto: UpdateReportDto,
  ): Promise<BillOfLadingReportEntity> {
    const report = await this.findReportById.findReportById(
      updatePositionDto.reportId,
    );

    console.log(updatePositionDto);

    if (updatePositionDto.isValid === true) {
      report.updateReportStatus(updatePositionDto.isValid);
    }

    return this.saveReportPort.save(report);
  }
}
