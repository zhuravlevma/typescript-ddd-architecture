import { ReportPositionEntity } from '../../entities/report-position.entity';

export abstract class FindPositionByIdPort {
  abstract findPositionById(
    orderId: string,
  ): Promise<ReportPositionEntity | null>;
}
