import { Project } from 'ts-morph';

export interface FileNamesAreValidParamsCheck {
  startsWith?: string;
  endsWith: string;
}

export interface FileNamesAreValidParams {
  inDirectory: string;
  sourceFiles: string;
  cheks: FileNamesAreValidParamsCheck[];
}

function fixDirectoryName(directory: string) {
  return directory.replace(/^\/|\/$/g, '');
}

export function fileNamesAreValid(params: FileNamesAreValidParams): string[] {
  const violations: string[] = [];

  const project = new Project();
  project.addSourceFilesAtPaths(params.sourceFiles);

  project.getSourceFiles().forEach((file) => {
    const filePath = file.getFilePath();
    const relativePath = filePath.split(
      `/${fixDirectoryName(params.inDirectory)}/`,
    )[1];

    for (const check of params.cheks) {
      if (check.startsWith !== undefined) {
        check.startsWith = `${fixDirectoryName(check.startsWith)}/`;
      }
    }

    const check = params.cheks.find((check) =>
      relativePath.startsWith(check.startsWith),
    );

    if (check === undefined) {
      if (relativePath.indexOf('/') === -1) {
        const checkEnd = params.cheks.find(
          (check) =>
            check.startsWith === undefined &&
            relativePath.endsWith(check.endsWith),
        );
        if (checkEnd === undefined) {
          violations.push(
            `The end of the file ${filePath} does not meet the criteria.`,
          );
        }
      } else {
        violations.push(`The path ${filePath} contains nested folders`);
      }
    } else {
      if (!relativePath.endsWith(check.endsWith)) {
        violations.push(
          `${filePath} is in '${check.startsWith}' but does not end with '${check.endsWith}'`,
        );
      }

      const pathWithoutEnd = relativePath.split(check.endsWith)[0];
      const middlePath = pathWithoutEnd.split(check.startsWith)[1];

      if (middlePath.indexOf('/') !== -1) {
        violations.push(`The path ${filePath} contains nested folders`);
      }
    }
  });
  return violations;
}

export interface NotDependParams {
  notDependFrom: string[];
  sourceFiles: string;
}

export function notDepend(payload: NotDependParams) {
  const violations: string[] = [];

  const project = new Project();
  project.addSourceFilesAtPaths(payload.sourceFiles);
  project.getSourceFiles().forEach((file) => {
    const filePath = file.getFilePath();

    file.getImportDeclarations().forEach((importDecl) => {
      const importPath = importDecl.getModuleSpecifierValue();

      for (const check of payload.notDependFrom) {
        if (importPath.search(check) !== -1) {
          violations.push(filePath);
        }
      }
    });
  });

  return violations;
}
