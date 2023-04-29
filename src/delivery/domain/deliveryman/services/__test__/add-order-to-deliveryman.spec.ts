import { DeliverymanEntity } from '../../entities/deliveryman.entity';
import { AddOrderToDeliverymanDto } from '../../ports/in/add-order-to-deliveryman.use-case';
import { AddOrderToDeliverymanService } from '../add-order-to-deliveryman.service';

describe('delivery/domain/deliveryman/services/add-order-to-deliveryman.service', () => {
  let deliverymanEntity: DeliverymanEntity;
  const saveDeliverymanPort = {
    save: jest.fn(),
  };
  const findDeliverymanByIdWithOrdersPort = {
    findDeliverymanByIdWithOrders: jest.fn(),
  };

  beforeEach(() => {
    deliverymanEntity = new DeliverymanEntity({
      id: 'uuid',
      firstName: 'test_name',
      lastName: 'test_lastname',
      isActive: true,
      orders: [],
    });
  });
  it('adding order is complete', async () => {
    findDeliverymanByIdWithOrdersPort.findDeliverymanByIdWithOrders.mockResolvedValue(
      deliverymanEntity,
    );
    const service = new AddOrderToDeliverymanService(
      findDeliverymanByIdWithOrdersPort,
      saveDeliverymanPort,
    );

    const createOrderDto: AddOrderToDeliverymanDto = {
      name: 'test',
      description: 'testdescr',
    };

    await service.addOrderToDeliveryman('deliverymanId', createOrderDto);

    expect(deliverymanEntity.orders.length).toEqual(1);
  });
});
