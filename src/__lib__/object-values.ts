import * as _ from 'lodash';
import { DeepReadonly } from './readonly';

export abstract class ObjectValues<Attributes> {
  protected __data: Attributes;
  constructor(attributes: Attributes) {
    this.__data = attributes;
  }
  export(): DeepReadonly<Attributes> {
    return _.cloneDeep(this.__data as DeepReadonly<Attributes>);
  }
}
