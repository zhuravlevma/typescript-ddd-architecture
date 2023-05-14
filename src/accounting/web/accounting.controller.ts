import { Controller, Param, Post } from '@nestjs/common';
import { FindReportByIdUseCase } from '../domain/ports/in/find-report-by-id.use-case';
import { BillOfLadingReportEntity } from '../domain/entities/bill-of-lading-report.entity';

@Controller('reports')
export class AccountingController {
  constructor(private readonly findReportByIdService: FindReportByIdUseCase) {}

  @Post('/:reportId')
  updateOrderById(
    @Param('reportId') reportId: string,
  ): Promise<BillOfLadingReportEntity> {
    return this.findReportByIdService.execute(reportId);
  }
}
