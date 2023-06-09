import 'tsarch/dist/jest';

import { filesOfProject } from 'tsarch';
describe('dal boundaries', () => {
  jest.setTimeout(60000);
  it('allows multiple patterns for dal', async () => {
    const violations = await filesOfProject()
      .inFolder('*/*/dal')
      .should()
      .matchPattern('(orm-entities|.mapper.ts|repository.ts)')
      .check();

    expect(violations).toEqual([]);
  });
  it('allows multiple patterns for orm-entities', async () => {
    const violations = await filesOfProject()
      .inFolder('*/*/dal/orm-entities')
      .should()
      .matchPattern('.orm-entity.ts')
      .check();

    expect(violations).toEqual([]);
  });

  it('dal should not depend on the controller', async () => {
    const rule = filesOfProject()
      .inFolder('*/*')
      .inFolder('*/*/dal/*')
      .shouldNot()
      .dependOnFiles()
      .matchingPattern('.controller.ts');

    await expect(rule).toPassAsync();
  });

  it('dal should not depend on the dtos', async () => {
    const rule = filesOfProject()
      .inFolder('*/*/dal/*')
      .shouldNot()
      .dependOnFiles()
      .inFolder('*/dtos/*');

    await expect(rule).toPassAsync();
  });
});
