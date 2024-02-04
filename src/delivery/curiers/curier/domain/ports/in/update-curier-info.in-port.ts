import { CurierEntity } from '../../entities/curier.entity';

export interface UpdateCuriersInfoCommand {
  curierId: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
}
export abstract class UpdateCuriersInPort {
  abstract execute(
    updateCuriersInfoCommand: UpdateCuriersInfoCommand,
  ): Promise<CurierEntity>;
}
