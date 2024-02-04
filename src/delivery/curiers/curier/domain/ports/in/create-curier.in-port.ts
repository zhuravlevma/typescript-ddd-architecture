import { CurierEntity } from '../../entities/curier.entity';

export interface CreateCurierCommand {
  firstName: string;
  lastName: string;
}
export abstract class CreateCurierInPort {
  abstract execute(
    createCurierCommand: CreateCurierCommand,
  ): Promise<CurierEntity>;
}
