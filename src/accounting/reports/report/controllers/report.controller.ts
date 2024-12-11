import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { OrderValidatedEvent } from 'src/warehouse/order-management/warehouse/domain/events/order-validated.event';
import { ReportEntity } from '../domain/entities/report.entity';
import { CreateReportInPort } from '../domain/ports/in/create-report.in-port';
import { FindReportByIdInPort } from '../domain/ports/in/find-report-by-id.in-port';
import { UpdateReportInPort } from '../domain/ports/in/update-report.in-port';
import { SavedReportResponseDto } from './dtos/response/saved-report.response-dto';
import { UpdateReportDto } from './dtos/update-report.dto';
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
  async findByReportId(
    @Param('reportId') id: string,
  ): Promise<SavedReportResponseDto> {
    const report = await this.findReportByIdQuery.execute({
      id,
    });
    return SavedReportResponseDto.fromDomain(report);
  }

  @Patch('/:reportId')
  async updateReport(
    @Param('reportId') reportId: string,
    @Body() updateReportDto: UpdateReportDto,
  ): Promise<SavedReportResponseDto> {
    const report = await this.updateReportInteractor.execute({
      reportId,
      isValid: updateReportDto.isValid,
    });
    return SavedReportResponseDto.fromDomain(report);
  }

  @EventPattern(config().topics.orderValidated)
  applyOrderValidated(
    @Payload() event: OrderValidatedEvent,
  ): Promise<ReportEntity> {
    return this.createReportInteractor.execute({
      orderId: event.payload.orderId,
    });
  }
}
