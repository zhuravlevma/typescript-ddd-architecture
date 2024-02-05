import * as _ from 'lodash';
import { DeepReadonly } from './readonly';

export abstract class Entity<Attributes> {
  export(): DeepReadonly<Attributes> {
    return _.cloneDeep(_.toPlainObject(this));
  }
}
