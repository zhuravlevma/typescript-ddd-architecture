// imports and applies the jest extensions
import 'tsarch/dist/jest';

// imports the files entrypoint
import { filesOfProject } from 'tsarch';

describe('architecture', () => {
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

  it('allows multiple patterns', async () => {
    const violations = await filesOfProject()
      .inFolder('*/domain/interactors/*')
      .should()
      .matchPattern('.interactor.*.ts')
      .check();

    expect(violations).toEqual([]);
  });
});
