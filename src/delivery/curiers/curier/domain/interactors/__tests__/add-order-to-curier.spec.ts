import { CurierEntity } from '../../entities/curier.entity';
import { AddOrderToCurierCommand } from '../../ports/in/add-order-to-curier.in-port';
import { AddOrderToCurierInteractor } from '../add-order-to-curier.interactor';

describe('delivery/domain/curier/services/add-order-to-curier.service', () => {
  let curierEntity: CurierEntity;
  const saveCurierPort = {
    save: jest.fn(),
  };
  const findCurierByIdWithOrdersPort = {
    findCurierByIdWithOrders: jest.fn(),
  };

  beforeEach(() => {
    curierEntity = new CurierEntity({
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
    findCurierByIdWithOrdersPort.findCurierByIdWithOrders.mockResolvedValue(
      curierEntity,
    );
    const service = new AddOrderToCurierInteractor(
      findCurierByIdWithOrdersPort,
      saveCurierPort,
    );
    const createOrderDto: AddOrderToCurierCommand = {
      curierId: 'curierId',
      orderId: 'orderId',
    };

    await service.execute(createOrderDto);

    expect(curierEntity.export().orders.length).toEqual(1);
  });
});
