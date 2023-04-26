export interface ChangeDeliverymansStatusDto {
  isActive: boolean;
}

export interface ChangeDeliverymansStatusUseCase {
  changeDeliverymansStatus(
    deliverymanId: string,
    changeDeliverymansStatusDto: ChangeDeliverymansStatusDto,
  );
}
