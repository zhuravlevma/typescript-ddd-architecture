import { ReportEntity } from '../entities/report.entity';
import {
  UpdateReprotCommand as UpdateReportDto,
  UpdateReportInPort,
} from '../ports/in/update-report.in-port';
import { FindReportByIdOutPort } from '../ports/out/find-report-by-id.out-port';
import { SaveReportOutPort } from '../ports/out/save-report.out-port';

export class UpdateReportInteractor implements UpdateReportInPort {
  constructor(
    private readonly findReportById: FindReportByIdOutPort,
    private readonly saveReportPort: SaveReportOutPort,
  ) {}

  async execute(updatePositionDto: UpdateReportDto): Promise<ReportEntity> {
    const report = await this.findReportById.findReportById(
      updatePositionDto.reportId,
    );

    if (updatePositionDto.isValid === true) {
      report.updateReportStatus(updatePositionDto.isValid);
    }

    return this.saveReportPort.save(report);
  }
}
