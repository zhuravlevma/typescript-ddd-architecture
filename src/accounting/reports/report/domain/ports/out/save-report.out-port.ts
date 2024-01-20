import { ReportEntity } from '../../entities/report.entity';

export abstract class SaveReportOutPort {
  abstract save(order: ReportEntity): Promise<ReportEntity>;
}
