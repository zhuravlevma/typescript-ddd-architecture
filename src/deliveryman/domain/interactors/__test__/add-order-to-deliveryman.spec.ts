import { DeliverymanEntity } from '../../entities/deliveryman.entity';
import { AddOrderToDeliverymanDto } from '../../ports/in/add-order-to-deliveryman.use-case';
import { AddOrderToDeliverymanInteractor } from '../add-order-to-deliveryman.interactor';

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
  it('order added successfully', async () => {
    findDeliverymanByIdWithOrdersPort.findDeliverymanByIdWithOrders.mockResolvedValue(
      deliverymanEntity,
    );
    const service = new AddOrderToDeliverymanInteractor(
      findDeliverymanByIdWithOrdersPort,
      saveDeliverymanPort,
    );
    const createOrderDto: AddOrderToDeliverymanDto = {
      deliverymanId: 'deliverymanId',
      order: {
        name: 'test',
        description: 'testdescr',
      },
    };

    await service.execute(createOrderDto);

    expect(deliverymanEntity.orders.length).toEqual(1);
  });
});
