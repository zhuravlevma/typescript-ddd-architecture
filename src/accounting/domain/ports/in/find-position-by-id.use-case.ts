import { ReportPositionEntity } from '../../entities/report-position.entity';

export abstract class FindPositionByIdUseCase {
  abstract execute(id: string): Promise<ReportPositionEntity | null>;
}
