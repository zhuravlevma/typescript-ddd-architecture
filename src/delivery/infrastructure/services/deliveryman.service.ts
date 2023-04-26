import { Injectable } from '@nestjs/common';
import { DeliverymanRepository } from '../repositories/deliveryman.repository';
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
import {
  UpdateDeliverymansInfoDto,
  UpdateDeliverymansInfoUseCase,
} from 'src/delivery/domain/ports/in/update-deliveryman-info.use-case';
import {
  ChangeDeliverymansStatusDto,
  ChangeDeliverymansStatusUseCase,
} from 'src/delivery/domain/ports/in/change-deliverymans-status.use-case';
import {
  UpdateDeliverymansOrdersUseCase,
  UpdateDeliverymansOrdersDto,
} from 'src/delivery/domain/ports/in/update-deliverymans-orders.dto';

@Injectable()
export class DeliverymanService
  implements
    AddOrderToDeliverymanUseCase,
    CreateDeliverymanUseCase,
    ChangeDeliverymansStatusUseCase,
    UpdateDeliverymansInfoUseCase,
    UpdateDeliverymansOrdersUseCase
{
  constructor(private deliverymanRepository: DeliverymanRepository) {}

  findAll(): Promise<Deliveryman[]> {
    return this.deliverymanRepository.findAllDeliveryMans();
  }

  createDeliveryman(
    createDeliverymanDto: CreateDeliverymanDto,
  ): Promise<Deliveryman> {
    return this.deliverymanRepository.createDeliveryMan(
      new Deliveryman(
        createDeliverymanDto.firstName,
        createDeliverymanDto.lastName,
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

  async updateDeliverymansOrders(
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
