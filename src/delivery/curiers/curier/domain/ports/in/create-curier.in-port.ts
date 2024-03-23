import { CurierEntity } from '../../entities/curier.entity';

export interface CreateCurierParams {
  firstName: string;
  lastName: string;
}
export abstract class CreateCurierInPort {
  abstract execute(createCurierParams: CreateCurierParams): Promise<CurierEntity>;
}
