import { ReportEntity } from '../entities/report.entity';
import {
  UpdateReportParams,
  UpdateReportInPort,
} from '../ports/in/update-report.in-port';
import { FindReportByIdOutPort } from '../ports/out/find-report-by-id.out-port';
import { SaveReportOutPort } from '../ports/out/save-report.out-port';

export class UpdateReportInteractor implements UpdateReportInPort {
  constructor(
    private readonly findReportById: FindReportByIdOutPort,
    private readonly saveReportPort: SaveReportOutPort,
  ) {}

  async execute(
    updatePositionParams: UpdateReportParams,
  ): Promise<ReportEntity> {
    const report = await this.findReportById.findReportById(
      updatePositionParams.reportId,
    );

    if (updatePositionParams.isValid === true) {
      report.updateReportStatus(updatePositionParams.isValid);
    }

    return this.saveReportPort.save(report);
  }
}
