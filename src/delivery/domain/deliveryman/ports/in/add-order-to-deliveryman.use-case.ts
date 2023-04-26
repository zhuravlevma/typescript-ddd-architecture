export interface AddOrderToDeliverymanDto {
  name: string;
  description: string;
}

export abstract class AddOrderToDeliverymanUseCase {
  abstract addOrderToDeliveryman(
    deliverymanId: string,
    addOrderToDeliverymanDto: AddOrderToDeliverymanDto,
  );
}
