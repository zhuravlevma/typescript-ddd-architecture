import { BillOfLadingPositionEntity } from '../../entities/bill-of-lading-position-accounting.entity';

export abstract class FindPositionByIdUseCase {
  abstract execute(id: string): Promise<BillOfLadingPositionEntity | null>;
}
