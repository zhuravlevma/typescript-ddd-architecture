import { DeliverymanEntity } from '../../entities/deliveryman.entity';
import { AddOrderToDeliverymanCommand } from '../../ports/in/add-order-to-deliveryman.in-port';
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
      email: 'email',
      phone: 8990099033,
      vehicleType: 'bike',
      workingHours: 10,
      rating: 0,
      deliveryCapacity: 2,
      specialization: 'food',
      commissionRate: 10,
      paymentDetails: 93321331332,
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
    const createOrderDto: AddOrderToDeliverymanCommand = {
      deliverymanId: 'deliverymanId',
      orderId: 'orderId',
    };

    await service.execute(createOrderDto);

    expect(deliverymanEntity.orders.length).toEqual(1);
  });
});
