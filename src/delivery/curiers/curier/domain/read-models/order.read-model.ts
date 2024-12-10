interface OrderAttributes {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  curierId: string;
  orderId: string;
}

export class OrderReadModel implements OrderAttributes {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly isActive: boolean;
  readonly curierId: string;
  readonly orderId: string;

  constructor(attributes: OrderAttributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.description = attributes.description;
    this.isActive = attributes.isActive;
    this.curierId = attributes.curierId;
    this.orderId = attributes.orderId;
  }
}
