export interface CreateDeliverymanDto {
  firstName: string;
  lastName: string;
}

export interface CreateDeliverymanUseCase {
  createDeliveryman(createDeliverymanDto: CreateDeliverymanDto);
}
