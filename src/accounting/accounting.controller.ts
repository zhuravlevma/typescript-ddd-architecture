import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderValidatedEvent } from 'src/warehouse/domain/events/order-validated.event';
import { CreateReportUseCase } from './domain/ports/in/create-report.use-case';
import { BillOfLadingReportEntity } from './domain/entities/bill-of-lading-report.entity';
import { FindReportByIdUseCase } from './domain/ports/in/find-report-by-id.use-case';
import { ApiTags } from '@nestjs/swagger';
import { UpdateReportUseCase } from './domain/ports/in/update-report.use-case';
import { UpdateReportNestDto } from './dtos/update-report.dto';

@ApiTags('reports')
@Controller('reports')
export class AccountingController {
  constructor(
    private readonly findReportByIdInteractor: FindReportByIdUseCase,
    private readonly createReportInteractor: CreateReportUseCase,
    private readonly updateReportInteractor: UpdateReportUseCase,
  ) {}

  @Get('/:reportId')
  findByReportId(
    @Param('reportId') reportId: string,
  ): Promise<BillOfLadingReportEntity> {
    return this.findReportByIdInteractor.execute(reportId);
  }

  @Patch('/:reportId')
  updateReport(
    @Param('reportId') reportId: string,
    @Body() updateReportDto: UpdateReportNestDto,
  ): Promise<BillOfLadingReportEntity> {
    return this.updateReportInteractor.execute({
      reportId,
      isValid: updateReportDto.isValid,
    });
  }

  @OnEvent('order-validated')
  handleOrderValidatedEvent(event: OrderValidatedEvent) {
    return this.createReportInteractor.execute({
      orderId: event.payload.orderId,
    });
  }
}
