import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DeliverymanService } from '../services/deliveryman.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateDeliverymansInfoDto } from '../dtos/update-deliverymans-info.dto';
import { UpdateDeliverymansOrdersDto } from '../dtos/update-deliverymans-orders.dto';
import { ChangeDeliverymansStatusDto } from '../dtos/change-deliverymans-status.dto';
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
    return this.deliverymanService.createDeliveryMan(createDeliveryManDto);
  }

  @Post('/:deliverymanId/orders')
  addOrderToDeliveryman(
    @Param('deliverymanId') deliverymanId: string,
    @Body() createDeliveryManDto: CreateOrderDto,
  ): Promise<Deliveryman> {
    return this.deliverymanService.addOrderToDeliveryman(
      +deliverymanId,
      createDeliveryManDto,
    );
  }

  @Patch('/:deliverymanId')
  updateDeliverymansInfo(
    @Param('deliverymanId') deliverymanId: string,
    @Body() updateDeliveryManDto: UpdateDeliverymansInfoDto,
  ): Promise<Deliveryman> {
    return this.deliverymanService.updateDeliverymansInfo(
      +deliverymanId,
      updateDeliveryManDto,
    );
  }

  @Patch('/:deliverymanId/status')
  changeDeliverymansStatus(
    @Param('deliverymanId') deliverymanId: string,
    @Body() changeDeliverymansStatusDto: ChangeDeliverymansStatusDto,
  ): Promise<Deliveryman> {
    return this.deliverymanService.changeDeliverymansStatus(
      +deliverymanId,
      changeDeliverymansStatusDto,
    );
  }

  @Patch('/:deliverymanId/orders')
  updateDeliverymansOrders(
    @Param('deliverymanId') deliverymanId: string,
    @Body() updateDeliverymansOrdersDto: UpdateDeliverymansOrdersDto,
  ): Promise<Deliveryman> {
    return this.deliverymanService.updateDeliverymansOrdersDto(
      +deliverymanId,
      updateDeliverymansOrdersDto,
    );
  }
}
