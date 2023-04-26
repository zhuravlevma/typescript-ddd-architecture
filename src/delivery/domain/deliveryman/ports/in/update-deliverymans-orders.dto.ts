export interface UpdateDeliverymansOrdersDto {
  description?: string;
}

export abstract class UpdateDeliverymansOrdersUseCase {
  abstract updateDeliverymansOrders(
    deliverymanId: string,
    updateDeliverymansOrdersDto: UpdateDeliverymansOrdersDto,
  );
}
