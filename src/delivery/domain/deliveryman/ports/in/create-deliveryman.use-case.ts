export interface CreateDeliverymanDto {
  firstName: string;
  lastName: string;
}

export abstract class CreateDeliverymanUseCase {
  abstract createDeliveryman(createDeliverymanDto: CreateDeliverymanDto);
}
