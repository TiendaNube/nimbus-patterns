import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import ts from "typescript";
import { extractExportedIdentifiers } from "./generate-next-index";

/* eslint no-console: "off" */

export interface NextSurfaceDiff {
  removedExports: string[];
  addedExports: string[];
}

export const compareNextSurface = (
  baselineExports: Iterable<string>,
  currentExports: Iterable<string>
): NextSurfaceDiff => {
  const baseSet = new Set(baselineExports);
  const currSet = new Set(currentExports);

  const removedExports: string[] = [];
  const addedExports: string[] = [];

  baseSet.forEach((id) => {
    if (!currSet.has(id)) {
      removedExports.push(id);
    }
  });

  currSet.forEach((id) => {
    if (!baseSet.has(id)) {
      addedExports.push(id);
    }
  });

  return {
    removedExports: removedExports.sort(),
    addedExports: addedExports.sort(),
  };
};

export const collectCurrentNextExports = (rootDir: string): Set<string> => {
  const nextDir = path.join(rootDir, "packages/react/src/next");
  const exportsSet = new Set<string>();
  if (!fs.existsSync(nextDir)) {
    return exportsSet;
  }

  const entries = fs.readdirSync(nextDir, { withFileTypes: true });
  entries.forEach((dirent) => {
    if (!dirent.isDirectory()) {
      return;
    }
    const entryFile = path.join(nextDir, dirent.name, "src", "index.ts");
    if (fs.existsSync(entryFile)) {
      const ids = extractExportedIdentifiers(entryFile);
      ids.forEach((id) => exportsSet.add(id));
    }
  });

  return exportsSet;
};

const extractDirectlyExportedIdentifiersFromSource = (
  sourceText: string,
  fileName = "index.ts"
): Set<string> => {
  const sf = ts.createSourceFile(
    fileName,
    sourceText,
    ts.ScriptTarget.ESNext,
    true
  );
  const ids = new Set<string>();

  sf.forEachChild((node) => {
    if (
      ts.isExportDeclaration(node) &&
      node.exportClause &&
      ts.isNamedExports(node.exportClause)
    ) {
      node.exportClause.elements.forEach((el) => ids.add(el.name.text));
    }
  });

  return ids;
};

export const collectBaselineNextExports = (
  rootDir: string,
  baseRef: string
): Set<string> => {
  const exportsSet = new Set<string>();
  try {
    const filesOut = execSync(
      `git ls-tree -r --name-only ${baseRef} packages/react/src/next`,
      {
        cwd: rootDir,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      }
    );
    const files = filesOut
      .split("\n")
      .map((f) => f.trim())
      .filter((f) =>
        /^packages\/react\/src\/next\/[^/]+\/src\/index\.ts$/.test(f)
      );

    files.forEach((relFile) => {
      const content = execSync(`git show ${baseRef}:${relFile}`, {
        cwd: rootDir,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });
      const ids = extractDirectlyExportedIdentifiersFromSource(
        content,
        relFile
      );
      ids.forEach((id) => exportsSet.add(id));
    });
  } catch {
    // Baseline ref does not have packages/react/src/next yet
  }
  return exportsSet;
};

if (require.main === module) {
  const args = process.argv.slice(2);
  let baseRef = "master";
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === "--base-ref" && args[i + 1]) {
      baseRef = args[i + 1];
      i += 1;
    } else if (args[i].startsWith("--base-ref=")) {
      baseRef = args[i].split("=")[1];
    }
  }
  const allowBreaking = args.includes("--allow-breaking");
  const rootDir = path.resolve(__dirname, "..");

  const baseline = collectBaselineNextExports(rootDir, baseRef);
  const current = collectCurrentNextExports(rootDir);
  const diff = compareNextSurface(baseline, current);

  if (diff.removedExports.length > 0 && !allowBreaking) {
    console.error(
      `❌ Breaking change detected in @nimbus-ds/patterns/next compared to ${baseRef}:`
    );
    diff.removedExports.forEach((id) => {
      console.error(`  - Removed export: ${id}`);
    });
    process.exit(1);
  }

  console.log(
    `✅ @nimbus-ds/patterns/next surface check passed (baseline=${baseline.size}, current=${current.size}, added=${diff.addedExports.length}, removed=${diff.removedExports.length}).`
  );
}
