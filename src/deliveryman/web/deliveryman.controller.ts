import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AddOrderToDeliverymanNestDto } from './dtos/add-order-to-deliveryman.dto';
import { UpdateDeliverymansInfoNestDto } from './dtos/update-deliverymans-info.dto';
import { UpdateDeliverymansOrdersNestDto } from './dtos/update-deliverymans-orders.dto';
import { ChangeDeliverymansStatusNestDto } from './dtos/change-deliverymans-status.dto';
import { CreateDeliverymanNestDto } from './dtos/create-deliveryman.dto';
import { DeliverymanEntity } from 'src/deliveryman/domain/entities/deliveryman.entity';
import { CreateDeliverymanUseCase } from 'src/deliveryman/domain/ports/in/create-deliveryman.use-case';
import { FindAllDeliverymansUseCase } from 'src/deliveryman/domain/ports/in/find-all-deliverymans.use-case';
import { AddOrderToDeliverymanUseCase } from 'src/deliveryman/domain/ports/in/add-order-to-deliveryman.use-case';
import { UpdateDeliverymansInfoUseCase } from 'src/deliveryman/domain/ports/in/update-deliveryman-info.use-case';
import { ChangeDeliverymansStatusUseCase } from 'src/deliveryman/domain/ports/in/change-deliverymans-status.use-case';
import { UpdateDeliverymansOrdersUseCase } from 'src/deliveryman/domain/ports/in/update-deliverymans-orders.use-case';
import { UpdateOrderStatusUseCase } from 'src/deliveryman/domain/ports/in/update-order-status.use-case';
import { UpdateOrderStatusNestDto } from './dtos/update-order-status.dto';

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
      order: {
        name: addOrderToDeliverymanNestDto.name,
        description: addOrderToDeliverymanNestDto.description,
      },
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
