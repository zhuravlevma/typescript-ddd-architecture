import { Entity } from 'src/__lib__/entity';

interface Attributes {
  id: string;
  name: string;
  code: number;
  sum: number;
}

export class CartPositionEntity extends Entity<Attributes> {
  private id: string;
  private name: string;
  private code: number;
  private sum: number;

  constructor(attributes: Attributes) {
    super();
    this.id = attributes.id;
    this.name = attributes.name;
    this.code = attributes.code;
    this.sum = attributes.sum;
  }

  get Code() {
    return this.code;
  }

  get Sum() {
    return this.sum;
  }

  // get Id() {
  //   return this.id;
  // }

  // changeStatus(isValid: boolean) {
  //   this.isValid = isValid;
  // }
}
