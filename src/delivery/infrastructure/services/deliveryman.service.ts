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
import { DeliverymanOrmEntity } from '../orm-entities/deliveryman.orm-entity';
import { OrderOrmEntity } from '../orm-entities/orders.orm-entity';
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
import { DeliverymanEntity } from 'src/delivery/domain/entities/deliveryman.entity';
import { v4 as uuid } from 'uuid';
import { OrderEntity } from 'src/delivery/domain/entities/order.entity';

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

  findAll(): Promise<DeliverymanEntity[]> {
    return this.deliverymanRepository.findAllDeliveryMans();
  }

  createDeliveryman(
    createDeliverymanDto: CreateDeliverymanDto,
  ): Promise<DeliverymanEntity> {
    return this.deliverymanRepository.createDeliveryMan(
      new DeliverymanEntity(
        uuid(),
        createDeliverymanDto.firstName,
        createDeliverymanDto.lastName,
        false,
        [],
      ),
    );
  }

  async addOrderToDeliveryman(
    deliverymanId: string,
    createOrderDto: AddOrderToDeliverymanDto,
  ): Promise<DeliverymanEntity> {
    try {
      const deliverymanWithOrders =
        await this.deliverymanRepository.findDeliverymanByIdWithOrders(
          deliverymanId,
        );

      const order = new OrderEntity(
        uuid(),
        createOrderDto.name,
        createOrderDto.description,
        false,
        deliverymanId,
      );
      order.checkName();

      deliverymanWithOrders.addOrder(order);

      return await this.deliverymanRepository.save(deliverymanWithOrders);
    } catch (error) {
      return error.message;
    }
  }

  async updateDeliverymansInfo(
    deliverymanId: string,
    updateDeliveryManDto: UpdateDeliverymansInfoDto,
  ): Promise<DeliverymanEntity> {
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
    deliverymanId: string,
    changeDeliverymansStatusDto: ChangeDeliverymansStatusDto,
  ): Promise<DeliverymanEntity> {
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
    deliverymanId: string,
    updateDeliverymansOrdersDto: UpdateDeliverymansOrdersDto,
  ): Promise<DeliverymanEntity> {
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
