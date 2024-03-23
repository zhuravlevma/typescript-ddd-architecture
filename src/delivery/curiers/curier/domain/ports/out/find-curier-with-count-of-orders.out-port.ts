import { CuriernWithCountOfOrders } from '../../read-models/curier-with-count-of-orders.model';

export abstract class FindCurierWithCountOfOrdersOutPort {
  abstract findCurierWithCountOfOrdersPort(curierId: string): Promise<CuriernWithCountOfOrders>;
}
