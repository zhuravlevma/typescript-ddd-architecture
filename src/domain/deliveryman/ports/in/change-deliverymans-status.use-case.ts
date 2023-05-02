export interface ChangeDeliverymansStatusDto {
  isActive: boolean;
}

export abstract class ChangeDeliverymansStatusUseCase {
  abstract changeDeliverymansStatus(
    deliverymanId: string,
    changeDeliverymansStatusDto: ChangeDeliverymansStatusDto,
  );
}
