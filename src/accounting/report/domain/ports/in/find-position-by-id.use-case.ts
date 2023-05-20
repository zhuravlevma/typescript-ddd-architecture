import { ReportPositionEntity } from '../../entities/report-position.entity';

export interface FindPositionByIdQuery {
  id: string;
}
export abstract class FindPositionByIdUseCase {
  abstract execute(
    findPositionByIdQuery: FindPositionByIdQuery,
  ): Promise<ReportPositionEntity | null>;
}
