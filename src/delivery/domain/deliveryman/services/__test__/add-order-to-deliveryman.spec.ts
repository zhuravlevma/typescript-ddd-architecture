import { DeliverymanEntity } from '../../entities/deliveryman.entity';
import { AddOrderToDeliverymanService } from '../add-order-to-deliveryman.service';

describe('delivery/domain/deliveryman/services/add-order-to-deliveryman.service', () => {
  it('adding order is complete', async () => {
    const deliverymanEntity = new DeliverymanEntity({
      id: 'uuid',
      firstName: 'test_name',
      lastName: 'test_lastname',
      isActive: true,
      orders: [],
    });
    const findDeliverymanByIdWithOrdersPort = {
      findDeliverymanByIdWithOrders: jest
        .fn()
        .mockResolvedValue(deliverymanEntity),
    };
    const saveDeliverymanPort = {
      save: jest.fn(),
    };
    const service = new AddOrderToDeliverymanService(
      findDeliverymanByIdWithOrdersPort,
      saveDeliverymanPort,
    );

    await service.addOrderToDeliveryman('deliverymanId', {
      name: 'test',
      description: 'testdescr',
    });

    expect(deliverymanEntity.orders.length).toEqual(1);
  });
});
