import { CurierEntity } from '../../entities/curier.entity';

export abstract class SaveCurierOutPort {
  abstract save(curier: CurierEntity): Promise<CurierEntity>;
}
