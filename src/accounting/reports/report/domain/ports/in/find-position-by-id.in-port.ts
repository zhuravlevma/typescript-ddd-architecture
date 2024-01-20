import { ReportPositionEntity } from '../../entities/report-position.entity';

export interface FindPositionByIdQuery {
  id: string;
}
export abstract class FindPositionByIdInPort {
  abstract execute(
    findPositionByIdQuery: FindPositionByIdQuery,
  ): Promise<ReportPositionEntity | null>;
}
