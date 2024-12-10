import { CuriernWithCountOfOrdersReadModel } from '../../read-models/curier-with-count-of-orders.read-model';

export interface FindCurierWithCountOfOrdersParams {
  curierId: string;
}

export abstract class FindCurierWithCountOfInPort {
  abstract execute(
    findCurierWithCountOfOrdersParams: FindCurierWithCountOfOrdersParams,
  ): Promise<CuriernWithCountOfOrdersReadModel>;
}
