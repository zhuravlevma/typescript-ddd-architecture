import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DeliverymanService } from '../services/deliveryman.service';
import { CreateOrderNestDto } from '../dtos/create-order.dto';
import { UpdateDeliverymansInfoNestDto } from '../dtos/update-deliverymans-info.dto';
import { UpdateDeliverymansOrdersNestDto } from '../dtos/update-deliverymans-orders.dto';
import { ChangeDeliverymansStatusNestDto } from '../dtos/change-deliverymans-status.dto';
import { Deliveryman } from '../orm-entities/deliveryman.model';
import { CreateDeliverymanNestDto } from '../dtos/create-deliveryman.dto';

@Controller('deliverymans')
export class DeliverymanController {
  constructor(private readonly deliverymanService: DeliverymanService) {}

  @Get('/')
  find(): Promise<Deliveryman[]> {
    return this.deliverymanService.findAll();
  }

  @Post('/')
  createDeliveryMan(
    @Body() createDeliveryManDto: CreateDeliverymanNestDto,
  ): Promise<Deliveryman> {
    return this.deliverymanService.createDeliveryman(createDeliveryManDto);
  }

  @Post('/:deliverymanId/orders')
  addOrderToDeliveryman(
    @Param('deliverymanId') deliverymanId: string,
    @Body() createDeliveryManDto: CreateOrderNestDto,
  ): Promise<Deliveryman> {
    return this.deliverymanService.addOrderToDeliveryman(
      +deliverymanId,
      createDeliveryManDto,
    );
  }

  @Patch('/:deliverymanId')
  updateDeliverymansInfo(
    @Param('deliverymanId') deliverymanId: string,
    @Body() updateDeliveryManDto: UpdateDeliverymansInfoNestDto,
  ): Promise<Deliveryman> {
    return this.deliverymanService.updateDeliverymansInfo(
      +deliverymanId,
      updateDeliveryManDto,
    );
  }

  @Patch('/:deliverymanId/status')
  changeDeliverymansStatus(
    @Param('deliverymanId') deliverymanId: string,
    @Body() changeDeliverymansStatusDto: ChangeDeliverymansStatusNestDto,
  ): Promise<Deliveryman> {
    return this.deliverymanService.changeDeliverymansStatus(
      +deliverymanId,
      changeDeliverymansStatusDto,
    );
  }

  @Patch('/:deliverymanId/orders')
  updateDeliverymansOrders(
    @Param('deliverymanId')
    deliverymanId: string,
    @Body() updateDeliverymansOrdersDto: UpdateDeliverymansOrdersNestDto,
  ): Promise<Deliveryman> {
    return this.deliverymanService.updateDeliverymansOrders(
      +deliverymanId,
      updateDeliverymansOrdersDto,
    );
  }
}
