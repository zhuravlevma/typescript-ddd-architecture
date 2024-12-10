import { Project, SourceFile } from 'ts-morph';

export function getSourceFiles(path: string) {
  const project = new Project();
  project.addSourceFilesAtPaths(path);
  return project.getSourceFiles();
}

export interface FileNamesAreValidParamsCheck {
  startsWith?: string;
  endsWith: string;
}

export interface FileNamesAreValidParams {
  inDirectory: string;
  cheks: FileNamesAreValidParamsCheck[];
}

function fixDirectoryName(directory: string) {
  return directory.replace(/^\/|\/$/g, '');
}

export function fileNamesAreValid(
  files: SourceFile[],
  params: FileNamesAreValidParams,
): string[] {
  const violations: string[] = [];

  files.forEach((file) => {
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
          violations.push(`${filePath} is invalid`);
        }
      } else {
        violations.push(`${filePath} is invalid`);
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
        violations.push(`${filePath} is invalid`);
      }
    }
  });
  return violations;
}
