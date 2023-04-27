import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AddOrderToDeliverymanNestDto } from '../dtos/add-order-to-deliveryman.dto';
import { UpdateDeliverymansInfoNestDto } from '../dtos/update-deliverymans-info.dto';
import { UpdateDeliverymansOrdersNestDto } from '../dtos/update-deliverymans-orders.dto';
import { ChangeDeliverymansStatusNestDto } from '../dtos/change-deliverymans-status.dto';
import { CreateDeliverymanNestDto } from '../dtos/create-deliveryman.dto';
import { DeliverymanEntity } from 'src/delivery/domain/deliveryman/entities/deliveryman.entity';
import { CreateDeliverymanUseCase } from 'src/delivery/domain/deliveryman/ports/in/create-deliveryman.use-case';
import { FindAllDeliverymansUseCase } from 'src/delivery/domain/deliveryman/ports/in/find-all-deliverymans.use-case';
import { AddOrderToDeliverymanUseCase } from 'src/delivery/domain/deliveryman/ports/in/add-order-to-deliveryman.use-case';
import { UpdateDeliverymansInfoUseCase } from 'src/delivery/domain/deliveryman/ports/in/update-deliveryman-info.use-case';
import { ChangeDeliverymansStatusUseCase } from 'src/delivery/domain/deliveryman/ports/in/change-deliverymans-status.use-case';
import { UpdateDeliverymansOrdersUseCase } from 'src/delivery/domain/deliveryman/ports/in/update-deliverymans-orders.dto';
import { UpdateOrderStatusUseCase } from 'src/delivery/domain/deliveryman/ports/in/update-order-status.use-case';
import { UpdateOrderStatusNestDto } from '../dtos/update-order-status.dto';

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
    return this.findAllDeliverymansService.findAll();
  }

  @Post('/')
  createDeliveryMan(
    @Body() createDeliveryManDto: CreateDeliverymanNestDto,
  ): Promise<DeliverymanEntity> {
    return this.createDeliverymanService.createDeliveryman(
      createDeliveryManDto,
    );
  }

  @Post('/:deliverymanId/orders')
  addOrderToDeliveryman(
    @Param('deliverymanId') deliverymanId: string,
    @Body() createDeliveryManDto: AddOrderToDeliverymanNestDto,
  ): Promise<DeliverymanEntity> {
    return this.addOrderToDeliverymanService.addOrderToDeliveryman(
      deliverymanId,
      createDeliveryManDto,
    );
  }

  @Patch('/:deliverymanId')
  updateDeliverymansInfo(
    @Param('deliverymanId') deliverymanId: string,
    @Body() updateDeliveryManDto: UpdateDeliverymansInfoNestDto,
  ): Promise<DeliverymanEntity> {
    return this.updateDeliverymansInfoService.updateDeliverymansInfo(
      deliverymanId,
      updateDeliveryManDto,
    );
  }

  @Patch('/:deliverymanId/status')
  changeDeliverymansStatus(
    @Param('deliverymanId') deliverymanId: string,
    @Body() changeDeliverymansStatusDto: ChangeDeliverymansStatusNestDto,
  ): Promise<DeliverymanEntity> {
    return this.changeDeliverymansStatusService.changeDeliverymansStatus(
      deliverymanId,
      changeDeliverymansStatusDto,
    );
  }

  @Patch('/:deliverymanId/orders')
  updateDeliverymansOrders(
    @Param('deliverymanId')
    deliverymanId: string,
    @Body() updateDeliverymansOrdersDto: UpdateDeliverymansOrdersNestDto,
  ): Promise<DeliverymanEntity> {
    return this.updateDeliverymansOrdersService.updateDeliverymansOrders(
      deliverymanId,
      updateDeliverymansOrdersDto,
    );
  }

  @Patch('/:deliverymanId/orders/:orderId/status')
  updateDeliverymansOrderStatus(
    @Param('deliverymanId')
    deliverymanId: string,
    @Param('orderId')
    orderId: string,
    @Body() updateDeliverymansOrdersDto: UpdateOrderStatusNestDto,
  ): Promise<DeliverymanEntity> {
    return this.updateOrderStatusService.updateOrderStatus(
      deliverymanId,
      orderId,
      updateDeliverymansOrdersDto,
    );
  }
}
