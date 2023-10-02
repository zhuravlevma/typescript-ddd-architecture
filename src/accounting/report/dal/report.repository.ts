import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BillOfLadingMapper as ReportMapper } from './report.mapper';
import { FindReportByIdOutPort } from '../domain/ports/out/find-report-by-id.out-port';
import { SaveReportOutPort } from '../domain/ports/out/save-report.out-port';
import { ReportEntity } from '../domain/entities/report.entity';
import { ReportOrmEntity } from './orm-entities/report.orm-entity';
import { OutboxMapper } from '../../../__relay__/outbox.mapper';

@Injectable()
export class ReportRepository
  implements FindReportByIdOutPort, SaveReportOutPort
{
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectRepository(ReportOrmEntity)
    private reportRepository: Repository<ReportOrmEntity>,
  ) {}
  async findReportById(reportId: string): Promise<ReportEntity> {
    const [order] = await this.reportRepository.find({
      where: { id: reportId },
      relations: {
        positions: true,
      },
    });
    return ReportMapper.mapToDomain(order);
  }

  async save(report: ReportEntity): Promise<ReportEntity> {
    const outboxORM = report.events.map((event) =>
      OutboxMapper.mapToORM(event),
    );
    const reportOrm = ReportMapper.mapToOrm(report);

    const savedReport = await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(outboxORM);
        return await transactionalEntityManager.save(reportOrm);
      },
    );
    return ReportMapper.mapToDomain(savedReport);
  }
}
