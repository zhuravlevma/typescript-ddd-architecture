export interface AddOrderToDeliverymanDto {
  name: string;
  description: string;
}

export interface AddOrderToDeliverymanUseCase {
  addOrderToDeliveryman(
    deliverymanId: string,
    addOrderToDeliverymanDto: AddOrderToDeliverymanDto,
  );
}
