import { DeliverymanEntity } from '../deliveryman.entity';
import { OrderEntity } from '../order.entity';

describe('delivery/domain/deliveryman/entities/deliveryman.entity', () => {
  it('order added successfully', () => {
    const deliveryman = new DeliverymanEntity({
      id: 'uuid',
      firstName: 'test_name',
      lastName: 'test_lastname',
      isActive: true,
      orders: [],
    });

    deliveryman.addOrder(
      new OrderEntity({
        id: 'testuuid',
        name: 'name',
        description: 'description',
        isActive: true,
        deliverymanId: 'deliverymanId',
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
      orders: [
        new OrderEntity({
          id: 'testuuid',
          name: 'name',
          description: 'description',
          isActive: true,
          deliverymanId: 'deliverymanId',
          orderId: 'orderId1',
        }),
        new OrderEntity({
          id: 'testuuid1',
          name: 'name1',
          description: 'description1',
          isActive: true,
          deliverymanId: 'deliverymanId',
          orderId: 'orderId2',
        }),
        new OrderEntity({
          id: 'testuuid2',
          name: 'name2',
          description: 'description2',
          isActive: true,
          deliverymanId: 'deliverymanId',
          orderId: 'orderId3',
        }),
        new OrderEntity({
          id: 'testuuid3',
          name: 'name3',
          description: 'description3',
          isActive: true,
          deliverymanId: 'deliverymanId',
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
          orderId: 'orderId5',
        }),
      );
    };

    expect(res).toThrow(Error);
    expect(res).toThrow('Exceeded the number of orders');
  });
});
