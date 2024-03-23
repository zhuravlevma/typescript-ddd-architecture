import { CurierEntity } from '../../entities/curier.entity';

export interface ChangeCuriersStatusParams {
  curierId: string;
  isActive: boolean;
}
export abstract class ChangeCuriersStatusInPort {
  abstract execute(
    changeCuriersStatusParams: ChangeCuriersStatusParams,
  ): Promise<CurierEntity>;
}
