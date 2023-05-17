import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AddOrderToDeliverymanNestDto } from './dtos/add-order-to-deliveryman.dto';
import { UpdateDeliverymansInfoNestDto } from './dtos/update-deliverymans-info.dto';
import { UpdateDeliverymansOrdersNestDto } from './dtos/update-deliverymans-orders.dto';
import { ChangeDeliverymansStatusNestDto } from './dtos/change-deliverymans-status.dto';
import { CreateDeliverymanNestDto } from './dtos/create-deliveryman.dto';
import { DeliverymanEntity } from 'src/delivery/deliveryman/domain/entities/deliveryman.entity';
import { UpdateOrderStatusNestDto } from './dtos/update-order-status.dto';
import { AddOrderToDeliverymanUseCase } from '../domain/ports/in/add-order-to-deliveryman.use-case';
import { ChangeDeliverymansStatusUseCase } from '../domain/ports/in/change-deliverymans-status.use-case';
import { CreateDeliverymanUseCase } from '../domain/ports/in/create-deliveryman.use-case';
import { FindAllDeliverymansUseCase } from '../domain/ports/in/find-all-deliverymans.use-case';
import { UpdateDeliverymansInfoUseCase } from '../domain/ports/in/update-deliveryman-info.use-case';
import { UpdateDeliverymansOrdersUseCase } from '../domain/ports/in/update-deliverymans-orders.use-case';
import { UpdateOrderStatusUseCase } from '../domain/ports/in/update-order-status.use-case';
import { OnEvent } from '@nestjs/event-emitter';
import { OfferTakedEvent } from 'src/delivery/offer/domain/events/offer-taked.event';

@Controller('deliverymans')
export class DeliverymanController {
  constructor(
    private readonly createDeliverymanService: CreateDeliverymanUseCase,
    private readonly findAllDeliverymansService: FindAllDeliverymansUseCase,
    private readonly addOrderToDeliverymanService: AddOrderToDeliverymanUseCase,
    private readonly updateDeliverymansInfoService: UpdateDeliverymansInfoUseCase,
    private readonly changeDeliverymansStatusService: ChangeDeliverymansStatusUseCase,
    private readonly updateDeliverymansOrdersService: UpdateDeliverymansOrdersUseCase,
    private readonly updateOrderStatusService: UpdateOrderStatusUseCase,
  ) {}

  @Get('/')
  find(): Promise<DeliverymanEntity[]> {
    return this.findAllDeliverymansService.execute();
  }

  @Post('/')
  createDeliveryMan(
    @Body() createDeliveryManDto: CreateDeliverymanNestDto,
  ): Promise<DeliverymanEntity> {
    return this.createDeliverymanService.execute(createDeliveryManDto);
  }

  @Post('/:deliverymanId/orders')
  addOrderToDeliveryman(
    @Param('deliverymanId') deliverymanId: string,
    @Body() addOrderToDeliverymanNestDto: AddOrderToDeliverymanNestDto,
  ): Promise<DeliverymanEntity> {
    return this.addOrderToDeliverymanService.execute({
      deliverymanId,
      orderId: addOrderToDeliverymanNestDto.orderId,
    });
  }

  @OnEvent('offer-taked')
  handleOrderValidatedEvent(event: OfferTakedEvent) {
    return this.addOrderToDeliverymanService.execute({
      deliverymanId: event.payload.deliverymanId,
      orderId: event.payload.orderId,
    });
  }

  @Patch('/:deliverymanId')
  updateDeliverymansInfo(
    @Param('deliverymanId') deliverymanId: string,
    @Body() updateDeliverymansInfoNestDto: UpdateDeliverymansInfoNestDto,
  ): Promise<DeliverymanEntity> {
    return this.updateDeliverymansInfoService.execute({
      deliverymanId,
      ...updateDeliverymansInfoNestDto,
    });
  }

  @Patch('/:deliverymanId/status')
  changeDeliverymansStatus(
    @Param('deliverymanId') deliverymanId: string,
    @Body() changeDeliverymansStatusDto: ChangeDeliverymansStatusNestDto,
  ): Promise<DeliverymanEntity> {
    return this.changeDeliverymansStatusService.execute({
      deliverymanId,
      ...changeDeliverymansStatusDto,
    });
  }

  @Patch('/:deliverymanId/orders')
  updateDeliverymansOrders(
    @Param('deliverymanId')
    deliverymanId: string,
    @Body() updateDeliverymansOrdersDto: UpdateDeliverymansOrdersNestDto,
  ): Promise<DeliverymanEntity> {
    return this.updateDeliverymansOrdersService.execute({
      deliverymanId,
      ...updateDeliverymansOrdersDto,
    });
  }

  @Patch('/:deliverymanId/orders/:orderId/status')
  updateDeliverymansOrderStatus(
    @Param('deliverymanId')
    deliverymanId: string,
    @Param('orderId')
    orderId: string,
    @Body() updateDeliverymansOrdersDto: UpdateOrderStatusNestDto,
  ): Promise<DeliverymanEntity> {
    return this.updateOrderStatusService.execute({
      deliverymanId,
      orderId,
      ...updateDeliverymansOrdersDto,
    });
  }
}
