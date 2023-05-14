import { BillOfLadingPositionEntity } from '../../entities/bill-of-lading-position-accounting.entity';

export abstract class FindPositionByIdPort {
  abstract findPositionById(
    orderId: string,
  ): Promise<BillOfLadingPositionEntity | null>;
}
