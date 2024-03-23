interface CuriernWithCountOfOrdersAttributes {
  curierId: string;
  count: number;
}

export class CuriernWithCountOfOrders implements CuriernWithCountOfOrdersAttributes {
  readonly curierId: string;
  readonly count: number;

  constructor(attributes: CuriernWithCountOfOrdersAttributes) {
    this.curierId = attributes.curierId;
    this.count = attributes.count;
  }
}
