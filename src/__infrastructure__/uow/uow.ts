import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
export abstract class UnitOfWork<C> {
  abstract runInTransaction<R>(fn: (manager: C) => Promise<R>): Promise<R>;
}

class Transaction implements UnitOfWork<EntityManager> {
  constructor(private manager: EntityManager) {
    this.manager = this.manager;
  }

  async runInTransaction<T>(
    fn: (manager: EntityManager) => Promise<T>,
  ): Promise<T> {
    return await this.manager.transaction(async (manager) => {
      this.manager = manager;
      const res = await fn(manager);
      this.manager = null;
      return res;
    });
  }
}

export class TypeOrmUnitOfWork implements UnitOfWork<EntityManager> {
  constructor(
    @InjectEntityManager()
    private manager: EntityManager,
  ) {
    this.manager = this.manager;
  }

  async runInTransaction<T>(
    fn: (manager: EntityManager) => Promise<T>,
  ): Promise<T> {
    const transaction = new Transaction(this.manager);
    return await transaction.runInTransaction(fn);
  }
}
