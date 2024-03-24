import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AddOrderToCurierDto } from './dtos/add-order-to-curier.dto';
import { UpdateCuriersInfoDto } from './dtos/update-curiers-info.dto';
import { ChangeCuriersStatusDto } from './dtos/change-curiers-status.dto';
import { CreateCurierDto } from './dtos/create-curier.dto';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';
import { AddOrderToCurierInPort } from './domain/ports/in/add-order-to-curier.in-port';
import { ChangeCuriersStatusInPort } from './domain/ports/in/change-curiers-status.in-port';
import { CreateCurierInPort } from './domain/ports/in/create-curier.in-port';
import { FindAllCuriersInPort } from './domain/ports/in/find-all-curiers.in-port';
import { UpdateCuriersInPort } from './domain/ports/in/update-curier-info.in-port';
import { UpdateOrderInPort } from './domain/ports/in/update-order.in-port';
import { OnEvent } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import { CurierEntity } from './domain/entities/curier.entity';
import { OfferTakedEvent } from '../../board/offer/domain/events/offer-taked.event';
import { config } from 'src/config';

@ApiTags('delivery')
@Controller('/delivery/curiers')
export class CurierController {
  constructor(
    private readonly createCurierInteractor: CreateCurierInPort,
    private readonly findAllCuriersQuery: FindAllCuriersInPort,
    private readonly addOrderToCurierInteractor: AddOrderToCurierInPort,
    private readonly updateCuriersInfoInteractor: UpdateCuriersInPort,
    private readonly changeCuriersStatusInteractor: ChangeCuriersStatusInPort,
    private readonly updateOrderStatusInteractor: UpdateOrderInPort,
  ) {}

  @Get('/')
  find(): Promise<CurierEntity[]> {
    return this.findAllCuriersQuery.execute();
  }

  @Post('/')
  createCurier(
    @Body() createCurierManDto: CreateCurierDto,
  ): Promise<CurierEntity> {
    return this.createCurierInteractor.execute(createCurierManDto);
  }

  @Post('/:curierId/orders')
  addOrderToCurier(
    @Param('curierId') curierId: string,
    @Body() addOrderToCurierDto: AddOrderToCurierDto,
  ): Promise<CurierEntity> {
    return this.addOrderToCurierInteractor.execute({
      curierId,
      orderId: addOrderToCurierDto.orderId,
    });
  }

  @OnEvent(config().topics.offerTaked)
  applyOfferTaked(event: OfferTakedEvent) {
    return this.addOrderToCurierInteractor.execute({
      curierId: event.payload.curierId,
      orderId: event.payload.orderId,
    });
  }

  @Patch('/:curierId')
  updateCuriersInfo(
    @Param('curierId') curierId: string,
    @Body() updateCuriersInfoNestDto: UpdateCuriersInfoDto,
  ): Promise<CurierEntity> {
    return this.updateCuriersInfoInteractor.execute({
      curierId,
      ...updateCuriersInfoNestDto,
    });
  }

  @Patch('/:curierId/status')
  changeCuriersStatus(
    @Param('curierId') curierId: string,
    @Body() changeCuriersStatusDto: ChangeCuriersStatusDto,
  ): Promise<CurierEntity> {
    return this.changeCuriersStatusInteractor.execute({
      curierId,
      ...changeCuriersStatusDto,
    });
  }

  @Patch('/:curierId/orders/:orderId')
  updateCuriersOrderStatus(
    @Param('curierId')
    curierId: string,
    @Param('orderId')
    orderId: string,
    @Body() updateCuriersOrdersDto: UpdateOrderStatusDto,
  ): Promise<CurierEntity> {
    return this.updateOrderStatusInteractor.execute({
      curierId,
      orderId,
      ...updateCuriersOrdersDto,
    });
  }
}
