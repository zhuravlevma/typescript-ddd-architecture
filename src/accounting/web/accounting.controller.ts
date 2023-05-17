import { Controller, Param, Post } from '@nestjs/common';
import { FindReportByIdUseCase } from '../domain/ports/in/find-report-by-id.use-case';
import { BillOfLadingReportEntity } from '../domain/entities/bill-of-lading-report.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderValidatedEvent } from 'src/warehouse/domain/events/order-validated.event';
import { CreateReportUseCase } from '../domain/ports/in/create-report.use-case';

@Controller('reports')
export class AccountingController {
  constructor(
    private readonly findReportByIdInteractor: FindReportByIdUseCase,
    private readonly createReportInteractor: CreateReportUseCase,
  ) {}

  @Post('/:reportId')
  updateOrderById(
    @Param('reportId') reportId: string,
  ): Promise<BillOfLadingReportEntity> {
    return this.findReportByIdInteractor.execute(reportId);
  }

  @OnEvent('order-validated')
  handleOrderValidatedEvent(event: OrderValidatedEvent) {
    console.log(event, 'dwdw');

    return this.createReportInteractor.execute({
      orderId: event.id,
    });
  }
}
