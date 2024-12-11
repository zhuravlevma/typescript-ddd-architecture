import { notDepend } from '../../src/__lib__/ts-arch';

describe('Architecture Rules', () => {
  it('Domain layer should not depend on dal/controllers', () => {
    const violations = notDepend({
      notDependFrom: ['/dal', '/controllers'],
      sourceFiles: 'src/**/**/domain/**/*.ts',
    });

    expect(violations).toEqual([]);
  });

  it('Controllers layer should not depend on dal', () => {
    const violations = notDepend({
      notDependFrom: ['/dal'],
      sourceFiles: 'src/**/**/controllers/**/*.ts',
    });

    expect(violations).toEqual([]);
  });

  it('Dal layer should not depend on controllers', () => {
    const violations = notDepend({
      notDependFrom: ['/controllers'],
      sourceFiles: 'src/**/**/dal/**/*.ts',
    });
    expect(violations).toEqual([]);
  });
});
