import { Injectable } from '@nestjs/common';
import { DeliverymanRepository } from '../repositories/deliveryman.repository';
import { UpdateDeliverymansInfoDto } from '../dtos/update-deliverymans-info.dto';
import { UpdateDeliverymansOrdersDto } from '../dtos/update-deliverymans-orders.dto';
import { ChangeDeliverymansStatusDto } from '../dtos/change-deliverymans-status.dto';
import {
  AddOrderToDeliverymanDto,
  AddOrderToDeliverymanUseCase,
} from 'src/delivery/domain/ports/in/add-order-to-deliveryman.use-case';
import {
  CreateDeliverymanDto,
  CreateDeliverymanUseCase,
} from 'src/delivery/domain/ports/in/create-deliveryman.use-case';
import { Deliveryman } from '../orm-entities/deliveryman.model';
import { Order } from '../orm-entities/orders.model';

@Injectable()
export class DeliverymanService
  implements AddOrderToDeliverymanUseCase, CreateDeliverymanUseCase
{
  constructor(private deliverymanRepository: DeliverymanRepository) {}

  findAll(): Promise<Deliveryman[]> {
    return this.deliverymanRepository.findAllDeliveryMans();
  }

  createDeliveryMan(
    createDeliveryManDto: CreateDeliverymanDto,
  ): Promise<Deliveryman> {
    return this.deliverymanRepository.createDeliveryMan(
      new Deliveryman(
        createDeliveryManDto.firstName,
        createDeliveryManDto.lastName,
      ),
    );
  }

  async addOrderToDeliveryman(
    deliverymanId: number,
    createOrderDto: AddOrderToDeliverymanDto,
  ): Promise<Deliveryman> {
    try {
      const deliverymanWithOrders =
        await this.deliverymanRepository.findDeliverymanByIdWithOrders(
          deliverymanId,
        );

      const order = new Order(createOrderDto.name, createOrderDto.description);
      order.checkName();

      deliverymanWithOrders.addOrder(order);

      return await this.deliverymanRepository.save(deliverymanWithOrders);
    } catch (error) {
      return error.message;
    }
  }

  async updateDeliverymansInfo(
    deliverymanId: number,
    updateDeliveryManDto: UpdateDeliverymansInfoDto,
  ): Promise<Deliveryman> {
    try {
      const deliverymanWithOrders =
        await this.deliverymanRepository.findDeliverymanByIdWithOrders(
          deliverymanId,
        );

      updateDeliveryManDto.firstName !== undefined ??
        (deliverymanWithOrders.firstName = updateDeliveryManDto.firstName);

      updateDeliveryManDto.lastName !== undefined ??
        (deliverymanWithOrders.lastName = updateDeliveryManDto.lastName);

      return await this.deliverymanRepository.save(deliverymanWithOrders);
    } catch (error) {
      return error.message;
    }
  }

  async changeDeliverymansStatus(
    deliverymanId: number,
    changeDeliverymansStatusDto: ChangeDeliverymansStatusDto,
  ): Promise<Deliveryman> {
    try {
      const deliverymanWithOrders =
        await this.deliverymanRepository.findDeliverymanByIdWithOrders(
          deliverymanId,
        );
      deliverymanWithOrders.changeStatus(changeDeliverymansStatusDto.isActive);

      return await this.deliverymanRepository.save(deliverymanWithOrders);
    } catch (error) {
      return error.message;
    }
  }

  async updateDeliverymansOrdersDto(
    deliverymanId: number,
    updateDeliverymansOrdersDto: UpdateDeliverymansOrdersDto,
  ): Promise<Deliveryman> {
    try {
      const deliverymanWithOrders =
        await this.deliverymanRepository.findDeliverymanByIdWithOrders(
          deliverymanId,
        );

      deliverymanWithOrders.addNewMessageToOrders(
        updateDeliverymansOrdersDto.description,
      );

      return await this.deliverymanRepository.save(deliverymanWithOrders);
    } catch (error) {
      return error.message;
    }
  }
}
