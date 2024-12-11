import { CurierEntity } from '../../domain/entities/curier.entity';

export class SavedCurierResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  email: string;
  phone: number;
  vehicleType: string;
  workingHours: number;
  rating: number;
  deliveryCapacity: number;
  specialization: string;
  commissionRate: number;
  paymentDetails: number;
  orders: SavedCurierOrderResponseDto[];

  static fromDomain(entity: CurierEntity): SavedCurierResponseDto {
    const respDto = new SavedCurierResponseDto();
    const curierReadonly = entity.export();
    respDto.id = curierReadonly.id;
    respDto.firstName = curierReadonly.firstName;
    respDto.lastName = curierReadonly.lastName;
    respDto.isActive = curierReadonly.isActive;
    respDto.email = curierReadonly.email;
    respDto.phone = curierReadonly.phone;
    respDto.vehicleType = curierReadonly.vehicleType;
    respDto.workingHours = curierReadonly.workingHours;
    respDto.rating = curierReadonly.rating;
    respDto.deliveryCapacity = curierReadonly.deliveryCapacity;
    respDto.specialization = curierReadonly.specialization;
    respDto.commissionRate = curierReadonly.commissionRate;
    respDto.paymentDetails = curierReadonly.commissionRate;
    respDto.orders = curierReadonly.orders.map((or) => {
      const orderDto = new SavedCurierOrderResponseDto();
      const orderReadonly = or.export();
      orderDto.id = orderReadonly.id;
      orderDto.name = orderReadonly.name;
      orderDto.description = orderReadonly.description;
      orderDto.isActive = orderReadonly.isActive;
      orderDto.weight = orderReadonly.weight;
      orderDto.totalSum = orderReadonly.totalSum;
      orderDto.curierId = orderReadonly.curierId;
      orderDto.orderId = orderReadonly.orderId;
      return orderReadonly;
    });
    return respDto;
  }
}

export class SavedCurierOrderResponseDto {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  weight: number;
  totalSum: number;
  curierId: string;
  orderId: string;
}
