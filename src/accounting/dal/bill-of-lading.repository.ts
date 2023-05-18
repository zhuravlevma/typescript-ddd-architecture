import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BillOfLadingMapper } from './bill-of-lading.mapper';
import { FindReportByIdPort } from '../domain/ports/out/find-report-by-id.port';
import { SaveReportPort } from '../domain/ports/out/save-report.port';
import { BillOfLadingReportEntity } from '../domain/entities/bill-of-lading-report.entity';
import { BillOfLadingReportOrmEntity } from './orm-entities/bill-of-lading-report.orm-entity';
import { OutboxMapper } from 'src/__relay__/outbox.mapper';

@Injectable()
export class BillOfLadingRepository
  implements FindReportByIdPort, SaveReportPort
{
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectRepository(BillOfLadingReportOrmEntity)
    private billOfLadingReportRepository: Repository<BillOfLadingReportOrmEntity>,
  ) {}
  async findReportById(reportId: string): Promise<BillOfLadingReportEntity> {
    const [order] = await this.billOfLadingReportRepository.find({
      where: { id: reportId },
      relations: {
        positions: true,
      },
    });
    return BillOfLadingMapper.mapToDomain(order);
  }

  async save(
    report: BillOfLadingReportEntity,
  ): Promise<BillOfLadingReportEntity> {
    const outboxORM = report.events.map((event) =>
      OutboxMapper.mapToORM(event),
    );
    const reportOrm = BillOfLadingMapper.mapToOrm(report);

    const savedReport = await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(outboxORM);
        return await transactionalEntityManager.save(reportOrm);
      },
    );
    return BillOfLadingMapper.mapToDomain(savedReport);
  }
}
