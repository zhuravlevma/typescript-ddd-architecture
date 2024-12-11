import { fileNamesAreValid } from '../../src/__lib__/ts-arch';

describe('DAL', () => {
  it('naming', () => {
    const violations = fileNamesAreValid({
      sourceFiles: 'src/**/**/dal/**/*.ts',
      inDirectory: 'dal',
      cheks: [
        {
          startsWith: 'utils/',
          endsWith: 'utils.ts',
        },
        {
          startsWith: 'orm-entities/',
          endsWith: 'orm-entity.ts',
        },
        {
          endsWith: 'repository.ts',
        },
        {
          endsWith: 'mapper.ts',
        },
      ],
    });

    expect(violations).toEqual([]);
  });
});
describe('DOMAIN', () => {
  it('naming entities', () => {
    const violations = fileNamesAreValid({
      sourceFiles: 'src/**/**/domain/entities/**/*.ts',
      inDirectory: 'entities',
      cheks: [
        {
          endsWith: 'entity.ts',
        },
        {
          startsWith: '__tests__',
          endsWith: 'spec.ts',
        },
      ],
    });

    expect(violations).toEqual([]);
  });

  it('naming events', () => {
    const violations = fileNamesAreValid({
      sourceFiles: 'src/**/**/domain/events/**/*.ts',
      inDirectory: 'events',
      cheks: [
        {
          endsWith: 'event.ts',
        },
      ],
    });
    expect(violations).toEqual([]);
  });

  it('naming commands', () => {
    const violations = fileNamesAreValid({
      sourceFiles: 'src/**/**/domain/commands/**/*.ts',
      inDirectory: 'commands',
      cheks: [
        {
          endsWith: 'command.ts',
        },
      ],
    });

    expect(violations).toEqual([]);
  });

  it('naming interactors', () => {
    const violations = fileNamesAreValid({
      sourceFiles: 'src/**/**/domain/interactors/**/*.ts',
      inDirectory: 'interactors',
      cheks: [
        {
          endsWith: 'interactor.ts',
        },
        {
          startsWith: '__tests__',
          endsWith: 'spec.ts',
        },
      ],
    });

    expect(violations).toEqual([]);
  });

  it('naming ports', () => {
    const violations = fileNamesAreValid({
      sourceFiles: 'src/**/**/domain/ports/**/*.ts',
      inDirectory: 'ports',
      cheks: [
        {
          startsWith: '/in/',
          endsWith: 'in-port.ts',
        },
        {
          startsWith: 'out',
          endsWith: 'out-port.ts',
        },
      ],
    });

    expect(violations).toEqual([]);
  });

  it('naming object-values', () => {
    const violations = fileNamesAreValid({
      sourceFiles: 'src/**/**/domain/object-values/**/*.ts',
      inDirectory: 'object-values',
      cheks: [
        {
          endsWith: 'object-value.ts',
        },
      ],
    });

    expect(violations).toEqual([]);
  });

  it('naming queries', () => {
    const violations = fileNamesAreValid({
      sourceFiles: 'src/**/**/domain/queries/**/*.ts',
      inDirectory: 'queries',
      cheks: [
        {
          endsWith: 'query.ts',
        },
      ],
    });

    expect(violations).toEqual([]);
  });

  it('naming read-models', () => {
    const violations = fileNamesAreValid({
      sourceFiles: 'src/**/**/domain/read-models/**/*.ts',
      inDirectory: 'read-models',
      cheks: [
        {
          endsWith: 'read-model.ts',
        },
      ],
    });

    expect(violations).toEqual([]);
  });
});

describe('Controllers', () => {
  it('naming controllers', () => {
    const violations = fileNamesAreValid({
      sourceFiles: 'src/**/**/controllers/**/*.ts',
      inDirectory: 'controllers',
      cheks: [
        {
          endsWith: 'controller.ts',
        },
        {
          startsWith: 'dtos/response',
          endsWith: 'response-dto.ts',
        },
        {
          startsWith: 'dtos',
          endsWith: 'dto.ts',
        },
      ],
    });

    expect(violations).toEqual([]);
  });
});
