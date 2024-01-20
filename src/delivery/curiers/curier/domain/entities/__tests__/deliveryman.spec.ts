import { DeliverymanEntity } from '../deliveryman.entity';
import { OrderEntity } from '../order.entity';

describe('delivery/domain/deliveryman/entities/deliveryman.entity', () => {
  it('order added successfully', () => {
    const deliveryman = new DeliverymanEntity({
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

    deliveryman.addOrder(
      new OrderEntity({
        id: 'testuuid',
        name: 'name',
        description: 'description',
        isActive: true,
        deliverymanId: 'deliverymanId',
        totalSum: 0,
        weight: 1,
        orderId: 'orderId',
      }),
    );

    expect(deliveryman.orders.length).toEqual(1);
  });

  it('order was not added successfully', () => {
    const deliveryman = new DeliverymanEntity({
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
          deliverymanId: 'deliverymanId',
          totalSum: 0,
          weight: 1,
          orderId: 'orderId1',
        }),
        new OrderEntity({
          id: 'testuuid1',
          name: 'name1',
          description: 'description1',
          isActive: true,
          deliverymanId: 'deliverymanId',
          totalSum: 0,
          weight: 1,
          orderId: 'orderId2',
        }),
        new OrderEntity({
          id: 'testuuid2',
          name: 'name2',
          description: 'description2',
          isActive: true,
          deliverymanId: 'deliverymanId',
          totalSum: 0,
          weight: 1,
          orderId: 'orderId3',
        }),
        new OrderEntity({
          id: 'testuuid3',
          name: 'name3',
          description: 'description3',
          isActive: true,
          deliverymanId: 'deliverymanId',
          totalSum: 0,
          weight: 1,
          orderId: 'orderId4',
        }),
      ],
    });

    const res = () => {
      deliveryman.addOrder(
        new OrderEntity({
          id: 'testuuid4',
          name: 'name4',
          description: 'description',
          isActive: true,
          deliverymanId: 'deliverymanId',
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
