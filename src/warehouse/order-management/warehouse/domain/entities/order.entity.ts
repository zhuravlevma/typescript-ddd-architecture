import { Entity } from 'src/__lib__/entity';

interface Attributes {
  id: string;
  name: string;
  isValid: boolean;
}

export class OrderEntity extends Entity<Attributes> {
  private id: string;
  private name: string;
  private isValid: boolean;
  constructor(attributes: Attributes) {
    super();
    this.id = attributes.id;
    this.name = attributes.name;
    this.isValid = attributes.isValid;
  }

  get Id() {
    return this.id;
  }

  changeStatus(isValid: boolean) {
    this.isValid = isValid;
  }
}
