export interface UpdateDeliverymansInfoDto {
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
}

export interface UpdateDeliverymansInfoUseCase {
  updateDeliverymansInfo(
    deliverymanId: string,
    updateDeliverymanInfoDto: UpdateDeliverymansInfoDto,
  );
}
