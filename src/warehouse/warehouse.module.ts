import { Module } from '@nestjs/common';
import { OrderManagmentModule } from './order-management/order-managment.module';
import { TrackingModule } from './tracking/tracking.module';

@Module({
  imports: [OrderManagmentModule, TrackingModule],
})
export class WarehouseModule {}
