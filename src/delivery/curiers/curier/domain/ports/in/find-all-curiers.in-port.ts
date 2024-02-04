import { CurierEntity } from '../../entities/curier.entity';

export abstract class FindAllCuriersInPort {
  abstract execute(): Promise<CurierEntity[]>;
}
