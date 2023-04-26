export interface UpdateDeliverymansOrdersDto {
  description?: string;
}

export interface UpdateDeliverymansOrdersUseCase {
  updateDeliverymansOrders(
    deliverymanId: string,
    updateDeliverymansOrdersDto: UpdateDeliverymansOrdersDto,
  );
}
