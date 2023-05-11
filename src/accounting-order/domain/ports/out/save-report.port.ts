import { BillOfLadingReportEntity } from '../../entities/bill-of-lading-report.entity';

export abstract class SaveReportPort {
  abstract save(
    order: BillOfLadingReportEntity,
  ): Promise<BillOfLadingReportEntity>;
}
