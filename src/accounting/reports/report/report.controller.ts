import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateReportInPort } from './domain/ports/in/create-report.in-port';
import { ReportEntity } from './domain/entities/report.entity';
import { FindReportByIdInPort } from './domain/ports/in/find-report-by-id.in-port';
import { ApiTags } from '@nestjs/swagger';
import { UpdateReportInPort } from './domain/ports/in/update-report.in-port';
import { UpdateReportDto } from './dtos/update-report.dto';
import { OrderValidatedEvent } from '../../../warehouse/order-management/warehouse/domain/events/order-validated.event';
import { config } from 'src/config';

@ApiTags('accounting')
@Controller('reports')
export class ReportController {
  constructor(
    private readonly findReportByIdQuery: FindReportByIdInPort,
    private readonly createReportInteractor: CreateReportInPort,
    private readonly updateReportInteractor: UpdateReportInPort,
  ) {}

  @Get('/:reportId')
  findByReportId(@Param('reportId') id: string): Promise<ReportEntity> {
    return this.findReportByIdQuery.execute({
      id,
    });
  }

  @Patch('/:reportId')
  updateReport(
    @Param('reportId') reportId: string,
    @Body() updateReportDto: UpdateReportDto,
  ): Promise<ReportEntity> {
    return this.updateReportInteractor.execute({
      reportId,
      isValid: updateReportDto.isValid,
    });
  }

  @OnEvent(config().topics.orderValidated)
  applyOrderValidated(event: OrderValidatedEvent) {
    return this.createReportInteractor.execute({
      orderId: event.payload.orderId,
    });
  }
}
