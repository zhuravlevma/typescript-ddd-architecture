interface CuriernWithCountOfOrdersAttributes {
  curierId: string;
  count: number;
}

export class CuriernWithCountOfOrdersReadModel
  implements CuriernWithCountOfOrdersAttributes
{
  readonly curierId: string;
  readonly count: number;

  constructor(attributes: CuriernWithCountOfOrdersAttributes) {
    this.curierId = attributes.curierId;
    this.count = attributes.count;
  }
}
