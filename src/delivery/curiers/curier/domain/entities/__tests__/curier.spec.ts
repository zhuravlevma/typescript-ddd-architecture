import { CurierEntity } from '../curier.entity';
import { OrderEntity } from '../order.entity';

describe('delivery/domain/curier/entities/curier.entity', () => {
  it('order added successfully', () => {
    const curier = new CurierEntity({
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

    curier.addOrder(
      new OrderEntity({
        id: 'testuuid',
        name: 'name',
        description: 'description',
        isActive: true,
        curierId: 'curierId',
        totalSum: 0,
        weight: 1,
        orderId: 'orderId',
      }),
    );

    expect(curier.orders.length).toEqual(1);
  });

  it('order was not added successfully', () => {
    const curier = new CurierEntity({
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
      orders: [
        new OrderEntity({
          id: 'testuuid',
          name: 'name',
          description: 'description',
          isActive: true,
          curierId: 'curierId',
          totalSum: 0,
          weight: 1,
          orderId: 'orderId1',
        }),
        new OrderEntity({
          id: 'testuuid1',
          name: 'name1',
          description: 'description1',
          isActive: true,
          curierId: 'curierId',
          totalSum: 0,
          weight: 1,
          orderId: 'orderId2',
        }),
        new OrderEntity({
          id: 'testuuid2',
          name: 'name2',
          description: 'description2',
          isActive: true,
          curierId: 'curierId',
          totalSum: 0,
          weight: 1,
          orderId: 'orderId3',
        }),
        new OrderEntity({
          id: 'testuuid3',
          name: 'name3',
          description: 'description3',
          isActive: true,
          curierId: 'curierId',
          totalSum: 0,
          weight: 1,
          orderId: 'orderId4',
        }),
      ],
    });

    const res = () => {
      curier.addOrder(
        new OrderEntity({
          id: 'testuuid4',
          name: 'name4',
          description: 'description',
          isActive: true,
          curierId: 'curierId',
          totalSum: 0,
          weight: 1,
          orderId: 'orderId5',
        }),
      );
    };

    expect(res).toThrow(Error);
    expect(res).toThrow('Exceeded the number of orders');
  });
});
