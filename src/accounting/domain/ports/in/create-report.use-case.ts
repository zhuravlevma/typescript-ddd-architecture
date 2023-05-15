import { BillOfLadingReportEntity } from '../../entities/bill-of-lading-report.entity';

export interface CreateReportDto {
  orderId: string;
}

export abstract class CreateReportUseCase {
  abstract execute(
    createReportDto: CreateReportDto,
  ): Promise<BillOfLadingReportEntity>;
}
