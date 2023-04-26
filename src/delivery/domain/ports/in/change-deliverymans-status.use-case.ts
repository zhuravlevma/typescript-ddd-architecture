export interface ChangeDeliverymansStatusDto {
  isActive: boolean;
}

export interface ChangeDeliverymansStatusUseCase {
  changeDeliverymansStatus(
    deliverymanId: number,
    changeDeliverymansStatusDto: ChangeDeliverymansStatusDto,
  );
}
