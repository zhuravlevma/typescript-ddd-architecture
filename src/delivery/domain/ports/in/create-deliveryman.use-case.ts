export interface CreateDeliverymanDto {
  firstName: string;
  lastName: string;
}

export interface CreateDeliverymanUseCase {
  createDeliveryMan(createDeliverymanDto: CreateDeliverymanDto);
}
