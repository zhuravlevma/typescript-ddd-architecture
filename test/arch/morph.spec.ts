import * as path from 'path';
import { fileNamesAreValid, getSourceFiles } from '../../src/__lib__/ts-arch';
import { Project } from 'ts-morph';

describe('DAL', () => {
  it('naming', () => {
    const dalFiles = getSourceFiles('src/**/**/dal/**/*.ts');
    const violations = fileNamesAreValid(dalFiles, {
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

    if (violations.length > 0) {
      throw new Error(
        `Found invalid files in 'dal' directory:\n${violations.join('\n')}`,
      );
    }
  });
});
describe('DOMAIN', () => {
  it('naming entities', () => {
    const dalFiles = getSourceFiles('src/**/**/domain/entities/**/*.ts');

    const violations = fileNamesAreValid(dalFiles, {
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

    if (violations.length > 0) {
      throw new Error(
        `Found invalid files in 'entity' directory:\n${violations.join('\n')}`,
      );
    }
  });

  it('naming events', () => {
    const dalFiles = getSourceFiles('src/**/**/domain/events/**/*.ts');

    const violations = fileNamesAreValid(dalFiles, {
      inDirectory: 'events',
      cheks: [
        {
          endsWith: 'event.ts',
        },
      ],
    });

    if (violations.length > 0) {
      throw new Error(
        `Found invalid files in 'event' directory:\n${violations.join('\n')}`,
      );
    }
  });

  it('naming interactors', () => {
    const dalFiles = getSourceFiles('src/**/**/domain/interactors/**/*.ts');

    const violations = fileNamesAreValid(dalFiles, {
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

    if (violations.length > 0) {
      throw new Error(
        `Found invalid files in 'interactors' directory:\n${violations.join('\n')}`,
      );
    }
  });

  it('naming ports', () => {
    const dalFiles = getSourceFiles('src/**/**/domain/ports/**/*.ts');

    const violations = fileNamesAreValid(dalFiles, {
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

    if (violations.length > 0) {
      throw new Error(
        `Found invalid files in 'ports' directory:\n${violations.join('\n')}`,
      );
    }
  });

  it('naming object-values', () => {
    const dalFiles = getSourceFiles('src/**/**/domain/object-values/**/*.ts');

    const violations = fileNamesAreValid(dalFiles, {
      inDirectory: 'object-values',
      cheks: [
        {
          endsWith: 'object-value.ts',
        },
      ],
    });

    if (violations.length > 0) {
      throw new Error(
        `Found invalid files in 'object-values' directory:\n${violations.join('\n')}`,
      );
    }
  });

  it('naming queries', () => {
    const dalFiles = getSourceFiles('src/**/**/domain/queries/**/*.ts');

    const violations = fileNamesAreValid(dalFiles, {
      inDirectory: 'queries',
      cheks: [
        {
          endsWith: 'query.ts',
        },
      ],
    });

    if (violations.length > 0) {
      throw new Error(
        `Found invalid files in 'object-values' directory:\n${violations.join('\n')}`,
      );
    }
  });

  it('naming read-models', () => {
    const dalFiles = getSourceFiles('src/**/**/domain/read-models/**/*.ts');

    const violations = fileNamesAreValid(dalFiles, {
      inDirectory: 'read-models',
      cheks: [
        {
          endsWith: 'read-model.ts',
        },
      ],
    });

    if (violations.length > 0) {
      throw new Error(
        `Found invalid files in 'object-values' directory:\n${violations.join('\n')}`,
      );
    }
  });
});

describe('Architecture Rules', () => {
  const project = new Project();
  project.addSourceFilesAtPaths('src/**/**/dal/*.ts');

  it('Services layer should not depend on Controllers', () => {
    const violations: string[] = [];

    project.getSourceFiles().forEach((file) => {
      const filePath = file.getFilePath();

      if (
        !filePath.endsWith('.repository.ts') &&
        !filePath.endsWith('.mapper.ts')
      ) {
        violations.push(filePath);
      }
    });

    if (violations.length > 0) {
      throw new Error(
        `Found files in 'repositories' that do not follow naming conventions:\n${violations.join(
          '\n',
        )}`,
      );
    }
  });
});

describe('Repositories should use mappers and entities only from their own module', () => {
  const ingoreAllModules = ['__relay__', '__lib__', '__infrastructure__'];
  const project = new Project();
  const srcPath = path.resolve(__dirname, '../../src');
  project.addSourceFilesAtPaths(`${srcPath}/**/*.ts`);

  it('Repositories should not import mappers or entities from other modules', () => {
    const violations: string[] = [];

    const repositoryFiles = project
      .getSourceFiles()
      .filter((file) => file.getFilePath().endsWith('repository.ts'));

    repositoryFiles.forEach((repositoryFile) => {
      const filePath = repositoryFile.getFilePath();
      const relativePath = path.relative(srcPath, filePath);
      const moduleRoot =
        relativePath.split(path.sep)[0] + '/' + relativePath.split(path.sep)[1];
      const modulePath = path.join(srcPath, moduleRoot);

      repositoryFile.getImportDeclarations().forEach((importDecl) => {
        const importPath = importDecl.getModuleSpecifierValue();

        for (const ingore of ingoreAllModules) {
          if (importPath.includes(ingore)) {
            return;
          }
        }

        if (
          importPath.includes('mapper') ||
          importPath.includes('orm-entity')
        ) {
          let resolvedImportPath: string;

          if (importPath.startsWith('src/')) {
            resolvedImportPath = path.resolve(srcPath, importPath);
          } else {
            resolvedImportPath = path.resolve(
              path.dirname(filePath),
              importPath,
            );
          }
          if (!resolvedImportPath.startsWith(modulePath)) {
            violations.push(
              `${filePath} imports ${importPath}, which is outside its own module`,
            );
          }
        }
      });
    });

    if (violations.length > 0) {
      throw new Error(
        `Found invalid imports in repositories:\n${violations.join('\n')}`,
      );
    }
  });
});
