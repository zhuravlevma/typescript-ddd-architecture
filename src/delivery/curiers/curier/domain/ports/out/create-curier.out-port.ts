import { CurierEntity } from '../../entities/curier.entity';

export abstract class CreateCurierOutPort {
  abstract createCurier(curier: CurierEntity): Promise<CurierEntity>;
}
