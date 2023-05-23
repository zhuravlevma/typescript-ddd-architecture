import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderValidatedEvent } from 'src/warehouse/warehouse/domain/events/order-validated.event';
import { CreateReportUseCase } from './domain/ports/in/create-report.use-case';
import { ReportEntity } from './domain/entities/report.entity';
import { FindReportByIdUseCase } from './domain/ports/in/find-report-by-id.use-case';
import { ApiTags } from '@nestjs/swagger';
import { UpdateReportUseCase } from './domain/ports/in/update-report.use-case';
import { UpdateReportDto } from './dtos/update-report.dto';

@ApiTags('reports')
@Controller('reports')
export class ReportController {
  constructor(
    private readonly findReportByIdUseCase: FindReportByIdUseCase,
    private readonly createReportUseCase: CreateReportUseCase,
    private readonly updateReportUseCase: UpdateReportUseCase,
  ) {}

  @Get('/:reportId')
  findByReportId(@Param('reportId') id: string): Promise<ReportEntity> {
    return this.findReportByIdUseCase.execute({
      id,
    });
  }

  @Patch('/:reportId')
  updateReport(
    @Param('reportId') reportId: string,
    @Body() updateReportDto: UpdateReportDto,
  ): Promise<ReportEntity> {
    return this.updateReportUseCase.execute({
      reportId,
      isValid: updateReportDto.isValid,
    });
  }

  @OnEvent('order-validated') // env fixed
  handleOrderValidatedEvent(event: OrderValidatedEvent) {
    return this.createReportUseCase.execute({
      orderId: event.payload.orderId,
    });
  }
}
