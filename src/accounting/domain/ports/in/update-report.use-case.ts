import { BillOfLadingReportEntity } from '../../entities/bill-of-lading-report.entity';

export interface UpdatePositionDto {
  orderId: string;
  isValid?: boolean;
}

export abstract class UpdatePositionUseCase {
  abstract execute(
    updateOrderDto: UpdatePositionDto,
  ): Promise<BillOfLadingReportEntity>;
}
