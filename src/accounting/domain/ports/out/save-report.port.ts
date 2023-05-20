import { ReportEntity } from '../../entities/report.entity';

export abstract class SaveReportPort {
  abstract save(order: ReportEntity): Promise<ReportEntity>;
}
