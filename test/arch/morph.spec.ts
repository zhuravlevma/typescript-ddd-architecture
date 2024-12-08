import * as path from 'path';
import { Project } from 'ts-morph';

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
