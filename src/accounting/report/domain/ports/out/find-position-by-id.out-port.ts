import { ReportPositionEntity } from '../../entities/report-position.entity';

export abstract class FindPositionByIdOutPort {
  abstract findPositionById(
    orderId: string,
  ): Promise<ReportPositionEntity | null>;
}
