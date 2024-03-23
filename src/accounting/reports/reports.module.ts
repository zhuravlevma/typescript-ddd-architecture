import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportPositionOrmEntity } from './report/dal/orm-entities/report-position.orm-entity';
import { ReportOrmEntity } from './report/dal/orm-entities/report.orm-entity';
import { ReportRepository } from './report/dal/report.repository';
import { CreateReportInteractor } from './report/domain/interactors/create-report.interactor';
import { FindReportByIdQuery } from './report/domain/queries/find-report-by-id.query';
import { UpdateReportInteractor } from './report/domain/interactors/update-report.interactor';
import { CreateReportInPort } from './report/domain/ports/in/create-report.in-port';
import { FindReportByIdInPort } from './report/domain/ports/in/find-report-by-id.in-port';
import { UpdateReportInPort } from './report/domain/ports/in/update-report.in-port';
import { FindReportByIdOutPort } from './report/domain/ports/out/find-report-by-id.out-port';
import { SaveReportOutPort } from './report/domain/ports/out/save-report.out-port';
import { ReportController } from './report/report.controller';
import { FindReportWithPositionsByOutPort } from './report/domain/ports/out/find-report-with-positions-by-id.out-port';
import { FindReportWithPositionsQuery } from './report/domain/queries/find-report-with-positions.query';
import { FindReportWithPositionsByIdInPort } from './report/domain/ports/in/find-report-with-positions-by-id.in-port';

@Module({
  imports: [TypeOrmModule.forFeature([ReportOrmEntity, ReportPositionOrmEntity])],
  controllers: [ReportController],
  providers: [
    {
      provide: UpdateReportInPort,
      useFactory: (a, b) => new UpdateReportInteractor(a, b),
      inject: [FindReportByIdOutPort, SaveReportOutPort],
    },
    {
      provide: CreateReportInPort,
      useFactory: (a) => new CreateReportInteractor(a),
      inject: [SaveReportOutPort],
    },
    {
      provide: FindReportByIdInPort,
      useFactory: (a) => new FindReportByIdQuery(a),
      inject: [FindReportByIdOutPort],
    },
    {
      provide: FindReportWithPositionsByIdInPort,
      useFactory: (a) => new FindReportWithPositionsQuery(a),
      inject: [FindReportWithPositionsByOutPort],
    },
    {
      provide: FindReportWithPositionsByOutPort,
      useClass: ReportRepository,
    },
    {
      provide: FindReportByIdOutPort,
      useClass: ReportRepository,
    },
    {
      provide: SaveReportOutPort,
      useClass: ReportRepository,
    },
  ],
  exports: [FindReportWithPositionsByIdInPort],
})
export class ReportsModule {}
