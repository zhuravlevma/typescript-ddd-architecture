import { ReportEntity } from '../../entities/report.entity';

export interface CreateReportDto {
  orderId: string;
}

export abstract class CreateReportUseCase {
  abstract execute(createReportDto: CreateReportDto): Promise<ReportEntity>;
}
