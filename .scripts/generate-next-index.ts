import fs from "fs";
import path from "path";
import ts from "typescript";

/* eslint no-console: "off" */

const AUTO_GENERATED_HEADER = "// AUTO-GENERATED FILE — DO NOT EDIT MANUALLY.";

const resolveLocalModuleFile = (
  fromDir: string,
  specifier: string
): string | null => {
  const baseTarget = path.resolve(fromDir, specifier);
  const candidates = [
    baseTarget,
    `${baseTarget}.ts`,
    `${baseTarget}.tsx`,
    path.join(baseTarget, "index.ts"),
    path.join(baseTarget, "index.tsx"),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
};

const hasExportModifier = (node: ts.Node): boolean => {
  const modifiers = (node as { modifiers?: ts.NodeArray<ts.Modifier> })
    .modifiers;
  if (!modifiers) {
    return false;
  }
  return modifiers.some(
    (m: ts.Modifier) => m.kind === ts.SyntaxKind.ExportKeyword
  );
};

export const extractExportedIdentifiers = (
  entryFilePath: string,
  visited = new Set<string>()
): Set<string> => {
  const normalizedPath = path.resolve(entryFilePath);
  if (visited.has(normalizedPath) || !fs.existsSync(normalizedPath)) {
    return new Set();
  }
  visited.add(normalizedPath);

  const content = fs.readFileSync(normalizedPath, "utf8");
  const sourceFile = ts.createSourceFile(
    normalizedPath,
    content,
    ts.ScriptTarget.ESNext,
    true
  );

  const identifiers = new Set<string>();
  const currentDir = path.dirname(normalizedPath);

  sourceFile.forEachChild((node) => {
    if (ts.isExportDeclaration(node)) {
      if (node.exportClause && ts.isNamedExports(node.exportClause)) {
        node.exportClause.elements.forEach((el) => {
          identifiers.add(el.name.text);
        });
      } else if (
        node.exportClause &&
        ts.isNamespaceExport(node.exportClause)
      ) {
        identifiers.add(node.exportClause.name.text);
      } else if (
        !node.exportClause &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        const spec = node.moduleSpecifier.text;
        if (spec.startsWith(".")) {
          const resolved = resolveLocalModuleFile(currentDir, spec);
          if (resolved) {
            const nested = extractExportedIdentifiers(resolved, visited);
            nested.forEach((id) => identifiers.add(id));
          }
        }
      }
      return;
    }

    if (hasExportModifier(node)) {
      if (ts.isVariableStatement(node)) {
        node.declarationList.declarations.forEach((decl) => {
          if (ts.isIdentifier(decl.name)) {
            identifiers.add(decl.name.text);
          }
        });
      } else if (
        (ts.isFunctionDeclaration(node) ||
          ts.isClassDeclaration(node) ||
          ts.isInterfaceDeclaration(node) ||
          ts.isTypeAliasDeclaration(node) ||
          ts.isEnumDeclaration(node)) &&
        node.name
      ) {
        identifiers.add(node.name.text);
      }
    }
  });

  return identifiers;
};

export interface GenerateNextIndexResult {
  outputPath: string;
  components: string[];
  content: string;
}

const compareStrings = (a: string, b: string): number => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

export const generateNextIndex = (
  rootDir: string = path.resolve(__dirname, "..")
): GenerateNextIndexResult => {
  const nextDir = path.join(rootDir, "packages/react/src/next");
  fs.mkdirSync(nextDir, { recursive: true });

  const entries = fs.readdirSync(nextDir, { withFileTypes: true });
  const componentDirs = entries
    .filter((dirent) => {
      if (!dirent.isDirectory()) {
        return false;
      }
      const componentIndex = path.join(
        nextDir,
        dirent.name,
        "src",
        "index.ts"
      );
      return fs.existsSync(componentIndex);
    })
    .map((dirent) => dirent.name)
    .sort(compareStrings);

  const seenExports = new Map<string, string>();
  const duplicates: string[] = [];

  for (const componentName of componentDirs) {
    const entryPath = path.join(nextDir, componentName, "src", "index.ts");
    const exportedIds = extractExportedIdentifiers(entryPath);
    exportedIds.forEach((identifier) => {
      const existingOwner = seenExports.get(identifier);
      if (existingOwner && existingOwner !== componentName) {
        duplicates.push(
          `Duplicate export "${identifier}" found in both "${existingOwner}" and "${componentName}"`
        );
      } else {
        seenExports.set(identifier, componentName);
      }
    });
  }

  if (duplicates.length > 0) {
    throw new Error(
      `Duplicate exported identifiers in packages/react/src/next:\n${duplicates.join(
        "\n"
      )}`
    );
  }

  const lines: string[] = [AUTO_GENERATED_HEADER];

  if (componentDirs.length === 0) {
    lines.push("export {};");
  } else {
    componentDirs.forEach((componentName) => {
      lines.push(`export * from "./${componentName}/src";`);
    });
  }

  const content = `${lines.join("\n")}\n`;
  const outputPath = path.join(nextDir, "index.ts");
  fs.writeFileSync(outputPath, content, "utf8");

  return {
    outputPath,
    components: componentDirs,
    content,
  };
};

if (require.main === module) {
  try {
    const result = generateNextIndex();
    console.log(
      `Generated ${path.relative(process.cwd(), result.outputPath)} (${
        result.components.length
      } next component(s))`
    );
  } catch (error: any) {
    console.error(error?.message || String(error));
    process.exit(1);
  }
}
