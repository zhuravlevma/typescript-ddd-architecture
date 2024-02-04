import * as _ from 'lodash';

/* eslint-disable @typescript-eslint/ban-types */
export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends Function
    ? T
    : T extends object
      ? DeepReadonlyObject<T>
      : T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export abstract class Entity<Attributes> {
  protected __data: Attributes;
  constructor(attributes: Attributes) {
    this.__data = attributes;
  }
  export(): DeepReadonly<Attributes> {
    return _.cloneDeep(this.__data as DeepReadonly<Attributes>);
  }
}
