import { ReportEntity } from '../../entities/report.entity';

export interface UpdateReprotDto {
  reportId: string;
  isValid?: boolean;
}

export abstract class UpdateReportUseCase {
  abstract execute(updateOrderDto: UpdateReprotDto): Promise<ReportEntity>;
}
