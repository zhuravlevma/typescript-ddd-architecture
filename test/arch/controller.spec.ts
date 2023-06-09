import 'tsarch/dist/jest';

import { filesOfProject } from 'tsarch';
describe('controller boundaries', () => {
  jest.setTimeout(60000);
  it('allows multiple patterns for dtos', async () => {
    const violations = await filesOfProject()
      .inFolder('*/*/dtos')
      .should()
      .matchPattern('.dto.ts')
      .check();

    expect(violations).toEqual([]);
  });

  it('controllers should not depend on the interfactors', async () => {
    const rule = filesOfProject()
      .inFolder('*/*')
      .matchingPattern('.controller.ts')
      .shouldNot()
      .dependOnFiles()
      .matchingPattern('.interactor.ts');

    await expect(rule).toPassAsync();
  });

  it('controllers should not depend on the dal', async () => {
    const rule = filesOfProject()
      .inFolder('*/*')
      .matchingPattern('.controller.ts')
      .shouldNot()
      .dependOnFiles()
      .inFolder('*/dal/*');

    await expect(rule).toPassAsync();
  });
});
