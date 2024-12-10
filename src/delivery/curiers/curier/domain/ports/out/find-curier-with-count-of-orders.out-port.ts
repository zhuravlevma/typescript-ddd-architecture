import { CuriernWithCountOfOrdersReadModel } from '../../read-models/curier-with-count-of-orders.read-model';

export abstract class FindCurierWithCountOfOrdersOutPort {
  abstract findCurierWithCountOfOrdersPort(
    curierId: string,
  ): Promise<CuriernWithCountOfOrdersReadModel>;
}
