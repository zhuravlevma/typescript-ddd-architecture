import { CurierEntity } from '../../entities/curier.entity';

export interface ChangeCuriersStatusCommand {
  curierId: string;
  isActive: boolean;
}
export abstract class ChangeCuriersStatusInPort {
  abstract execute(
    changeCuriersStatusCommand: ChangeCuriersStatusCommand,
  ): Promise<CurierEntity>;
}
