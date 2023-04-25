export interface AddOrderToDeliverymanDto {
  name: string;
  description: string;
}

export interface AddOrderToDeliverymanUseCase {
  addOrderToDeliveryman(
    deliverymanId: number,
    addOrderToDeliverymanDto: AddOrderToDeliverymanDto,
  );
}
