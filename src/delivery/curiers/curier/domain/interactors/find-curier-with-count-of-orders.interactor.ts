import {
  FindCurierWithCountOfInPort,
  FindCurierWithCountOfOrdersParams,
} from '../ports/in/find-curiers-with-count-of-orders.in-port';
import { FindCurierWithCountOfOrdersOutPort } from '../ports/out/find-curier-with-count-of-orders.out-port';
import { CuriernWithCountOfOrders } from '../read-models/curier-with-count-of-orders.model';

export class FindCurierWithCountOfOrdersInteractor
  implements FindCurierWithCountOfInPort
{
  constructor(
    private readonly findAllCuriersPort: FindCurierWithCountOfOrdersOutPort,
  ) {}

  execute(
    findCurierWithCountOfOrdersParams: FindCurierWithCountOfOrdersParams,
  ): Promise<CuriernWithCountOfOrders> {
    return this.findAllCuriersPort.findCurierWithCountOfOrdersPort(
      findCurierWithCountOfOrdersParams.curierId,
    );
  }
}
