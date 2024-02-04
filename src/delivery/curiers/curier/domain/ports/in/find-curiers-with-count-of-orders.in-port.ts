import { CuriernWithCountOfOrders } from '../../read-models/curier-with-count-of-orders.model';

export interface FindCurierWithCountOfOrdersParams {
  curierId: string;
}

export abstract class FindCurierWithCountOfInPort {
  abstract execute(
    findCurierWithCountOfOrdersParams: FindCurierWithCountOfOrdersParams,
  ): Promise<CuriernWithCountOfOrders>;
}
