import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateOfferNestDto } from './dtos/update-offer.dto';
import { UpdateOfferUseCase } from './domain/ports/in/update-offer.interactor';
import { OfferEntity } from './domain/entities/offer.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateOfferUseCase } from './domain/ports/in/create-offer.use-case';
import { ReportValidatedEvent } from 'src/accounting/domain/events/report-validated.event';

@ApiTags('warehouse')
@Controller('warehouses')
export class WarehouseController {
  constructor(
    private readonly updateOfferUseCase: UpdateOfferUseCase,
    private readonly createOfferUseCase: CreateOfferUseCase,
  ) {}

  @OnEvent('report-validated')
  handleReportValidatedEvent(event: ReportValidatedEvent) {
    return this.createOfferUseCase.execute({
      orderId: event.payload.orderId,
      name: 'Report with ' + event.payload.orderId,
    });
  }

  @ApiOkResponse({
    description: 'Saved offer with orders',
  })
  @Patch('/:offerId')
  async updateOrderStatus(
    @Param('offerId') offerId: string,
    @Body() updateOfferDto: UpdateOfferNestDto,
  ): Promise<OfferEntity> {
    return this.updateOfferUseCase.execute({
      offerId,
      deliverymanId: updateOfferDto.deliverymanId,
    });
  }
}
