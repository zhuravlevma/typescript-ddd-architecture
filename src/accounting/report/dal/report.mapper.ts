import { ReportPositionEntity } from '../domain/entities/report-position.entity';
import { SumObjectValue } from '../domain/object-values/sum.object-value';
import { ReportEntity } from '../domain/entities/report.entity';
import { ReportOrmEntity } from './orm-entities/report.orm-entity';
import { ReportPositionOrmEntity } from './orm-entities/report-position.orm-entity';

export class BillOfLadingMapper {
  static mapToDomain(reportOrm: ReportOrmEntity): ReportEntity {
    return new ReportEntity({
      id: reportOrm.id,
      isValid: reportOrm.isValid,
      orderId: reportOrm.orderId,
      positions: reportOrm.positions.map(
        (positionOrm) =>
          new ReportPositionEntity({
            id: positionOrm.id,
            name: positionOrm.name,
            count: positionOrm.count,
            code: positionOrm.code,
            weight: positionOrm.weight,
            sum: new SumObjectValue(positionOrm.sum, positionOrm.rate),
          }),
      ),
    });
  }
  static mapToOrm(reportEntity: ReportEntity): ReportOrmEntity {
    const reportOrmEntity = new ReportOrmEntity();
    reportOrmEntity.id = reportEntity.id;
    reportOrmEntity.isValid = reportEntity.isValid;
    reportOrmEntity.orderId = reportEntity.orderId;
    reportOrmEntity.positions = reportEntity.positions.map((positionEntity) => {
      const positionOrmEntity = new ReportPositionOrmEntity();
      positionOrmEntity.id = positionEntity.id;
      positionOrmEntity.name = positionEntity.name;
      positionOrmEntity.count = positionEntity.count;
      positionOrmEntity.code = positionEntity.code;
      positionOrmEntity.weight = positionEntity.weight;
      return positionOrmEntity;
    });
    return reportOrmEntity;
  }
}
