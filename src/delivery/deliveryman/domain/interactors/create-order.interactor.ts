// import { CreateOrderUseCase } from '../ports/in/create-order.use-case';

// export class CreateOrderInteractor implements CreateOrderUseCase {
//   constructor(private readonly createDeliverymanPort: CreateDeliverymanPort) {}

//   execute(
//     createDeliverymanDto: CreateDeliverymanDto,
//   ): Promise<DeliverymanEntity> {
//     return this.createDeliverymanPort.createDeliveryman(
//       new DeliverymanEntity({
//         id: uuid(),
//         firstName: createDeliverymanDto.firstName,
//         lastName: createDeliverymanDto.lastName,
//         isActive: true,
//         orders: [],
//       }),
//     );
//   }
// }
