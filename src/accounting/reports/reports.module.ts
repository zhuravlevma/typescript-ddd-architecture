import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportPositionOrmEntity } from './report/dal/orm-entities/report-position.orm-entity';
import { ReportOrmEntity } from './report/dal/orm-entities/report.orm-entity';
import { ReportRepository } from './report/dal/report.repository';
import { CreateReportInteractor } from './report/domain/interactors/create-report.interactor';
import { FindReportByIdInteractor } from './report/domain/interactors/find-report-by-id.interactor';
import { UpdateReportInteractor } from './report/domain/interactors/update-report.interactor';
import { CreateReportInPort } from './report/domain/ports/in/create-report.in-port';
import { FindReportByIdInPort } from './report/domain/ports/in/find-report-by-id.in-port';
import { UpdateReportInPort } from './report/domain/ports/in/update-report.in-port';
import { FindPositionByIdOutPort } from './report/domain/ports/out/find-position-by-id.out-port';
import { FindReportByIdOutPort } from './report/domain/ports/out/find-report-by-id.out-port';
import { SaveReportOutPort } from './report/domain/ports/out/save-report.out-port';
import { ReportController } from './report/report.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportOrmEntity, ReportPositionOrmEntity]),
  ],
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
      useFactory: (a) => new FindReportByIdInteractor(a),
      inject: [FindReportByIdOutPort],
    },
    {
      provide: FindReportByIdOutPort,
      useClass: ReportRepository,
    },
    {
      provide: FindPositionByIdOutPort,
      useClass: ReportRepository,
    },
    {
      provide: SaveReportOutPort,
      useClass: ReportRepository,
    },
  ],
})
export class ReportsModule {}
