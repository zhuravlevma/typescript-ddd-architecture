import { Entity } from 'src/__lib__/entity';

interface Attributes {
  id: string;
  name: string;
  isValid: boolean;
}

export class OrderEntity extends Entity<Attributes> {
  constructor(attributes: Attributes) {
    super(attributes);
  }

  get id() {
    return this.__data.id;
  }

  changeStatus(isValid: boolean) {
    this.__data.isValid = isValid;
  }
}
