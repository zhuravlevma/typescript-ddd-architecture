import {
  FindCurierWithCountOfInPort,
  FindCurierWithCountOfOrdersParams,
} from '../ports/in/find-curiers-with-count-of-orders.in-port';
import { FindCurierWithCountOfOrdersOutPort } from '../ports/out/find-curier-with-count-of-orders.out-port';
import { CuriernWithCountOfOrdersReadModel } from '../read-models/curier-with-count-of-orders.read-model';

export class FindCurierWithCountOfOrdersQuery
  implements FindCurierWithCountOfInPort
{
  constructor(
    private readonly findAllCuriersPort: FindCurierWithCountOfOrdersOutPort,
  ) {}

  execute(
    findCurierWithCountOfOrdersParams: FindCurierWithCountOfOrdersParams,
  ): Promise<CuriernWithCountOfOrdersReadModel> {
    return this.findAllCuriersPort.findCurierWithCountOfOrdersPort(
      findCurierWithCountOfOrdersParams.curierId,
    );
  }
}
