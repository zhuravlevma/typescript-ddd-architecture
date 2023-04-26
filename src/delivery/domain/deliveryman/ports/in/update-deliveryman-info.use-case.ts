export interface UpdateDeliverymansInfoDto {
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
}
export abstract class UpdateDeliverymansInfoUseCase {
  abstract updateDeliverymansInfo(
    deliverymanId: string,
    updateDeliverymanInfoDto: UpdateDeliverymansInfoDto,
  );
}
