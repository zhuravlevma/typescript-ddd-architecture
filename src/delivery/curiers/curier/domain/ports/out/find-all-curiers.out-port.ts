import { CurierEntity } from '../../entities/curier.entity';

export abstract class FindAllCuriersOutPort {
  abstract findAllCuriers(): Promise<CurierEntity[]>;
}
