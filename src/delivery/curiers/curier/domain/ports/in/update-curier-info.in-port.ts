import { CurierEntity } from '../../entities/curier.entity';

export interface UpdateCuriersInfoParams {
  curierId: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
}
export abstract class UpdateCuriersInPort {
  abstract execute(
    updateCuriersInfoParams: UpdateCuriersInfoParams,
  ): Promise<CurierEntity>;
}
