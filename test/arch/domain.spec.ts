import 'tsarch/dist/jest';

import { filesOfProject } from 'tsarch';
describe('domain boundaries', () => {
  jest.setTimeout(60000);
  it('business logic should not depend on the dal', async () => {
    const rule = filesOfProject()
      .inFolder('*/domain/*')
      .shouldNot()
      .dependOnFiles()
      .inFolder('*/dal/*');

    await expect(rule).toPassAsync();
  });

  it('business logic should not depend on the controller', async () => {
    const rule = filesOfProject()
      .inFolder('*/domain/*')
      .shouldNot()
      .dependOnFiles()
      .matchingPattern('controller.ts');

    await expect(rule).toPassAsync();
  });

  it('business logic should not depend on the dto', async () => {
    const rule = filesOfProject()
      .inFolder('*/domain/*')
      .shouldNot()
      .dependOnFiles()
      .inFolder('*/dtos/*');

    await expect(rule).toPassAsync();
  });

  it('business logic should be cycle free', async () => {
    const rule = filesOfProject()
      .inFolder('*/domain/*')
      .should()
      .beFreeOfCycles();

    await expect(rule).toPassAsync();
  });

  it('allows multiple patterns for interactors', async () => {
    const violations = await filesOfProject()
      .inFolder('*/*/domain/interactors')
      .should()
      .matchPattern('(.interactor.ts|__tests__)')
      .check();

    expect(violations).toEqual([]);
  });

  it('allows multiple patterns for entities', async () => {
    const violations = await filesOfProject()
      .inFolder('*/*/domain/entities')
      .should()
      .matchPattern('(.entity.ts|__tests__)')
      .check();

    expect(violations).toEqual([]);
  });

  it('allows multiple patterns for events', async () => {
    const violations = await filesOfProject()
      .inFolder('*/*/domain/events/*')
      .should()
      .matchPattern('.event.ts')
      .check();

    expect(violations).toEqual([]);
  });

  it('allows multiple patterns for object values', async () => {
    const violations = await filesOfProject()
      .inFolder('*/domain/object-values/*')
      .should()
      .matchPattern('.object-value.ts')
      .check();

    expect(violations).toEqual([]);
  });

  it('allows multiple patterns for input ports', async () => {
    const violations = await filesOfProject()
      .inFolder('*/*/domain/ports/in/*')
      .should()
      .matchPattern('.in-port.ts')
      .check();

    expect(violations).toEqual([]);
  });

  it('allows multiple patterns for output ports', async () => {
    const violations = await filesOfProject()
      .inFolder('*/*/domain/ports/out')
      .should()
      .matchPattern('.port.ts')
      .check();

    expect(violations).toEqual([]);
  });

  it('allows multiple patterns for read models', async () => {
    const violations = await filesOfProject()
      .inFolder('*/*/domain/read-models/out')
      .should()
      .matchPattern('.port.ts')
      .check();

    expect(violations).toEqual([]);
  });
});
