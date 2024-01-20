import { Module } from '@nestjs/common';
import { OrderManagmentModule } from './order-management/order-managment.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [OrderManagmentModule, LocationModule],
})
export class WarehouseModule {}
