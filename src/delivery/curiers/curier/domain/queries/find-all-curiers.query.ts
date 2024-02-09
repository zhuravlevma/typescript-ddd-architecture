import { CurierEntity } from '../entities/curier.entity';
import { FindAllCuriersInPort } from '../ports/in/find-all-curiers.in-port';
import { FindAllCuriersOutPort } from '../ports/out/find-all-curiers.out-port';

export class FindAllCuriersQuery implements FindAllCuriersInPort {
  constructor(private readonly findAllCuriersPort: FindAllCuriersOutPort) {}

  execute(): Promise<CurierEntity[]> {
    return this.findAllCuriersPort.findAllCuriers();
  }
}
