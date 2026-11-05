import fs from "fs";
import os from "os";
import path from "path";
import { execFileSync } from "child_process";
import { extractExportedIdentifiers } from "./generate-next-index";

/* eslint no-console: "off" */

const compareStrings = (a: string, b: string): number => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const resolveDefaultBaseRef = (rootDir: string): string => {
  try {
    execFileSync("git", ["rev-parse", "--verify", "origin/master^{commit}"], {
      cwd: rootDir,
      stdio: ["ignore", "pipe", "ignore"],
    });
    return "origin/master";
  } catch {
    return "HEAD";
  }
};

const validateGitRef = (rootDir: string, ref: string): string => {
  if (!ref || ref.startsWith("-")) {
    throw new Error(`Invalid git ref argument: "${ref}"`);
  }
  try {
    execFileSync("git", ["rev-parse", "--verify", `${ref}^{commit}`], {
      cwd: rootDir,
      stdio: ["ignore", "pipe", "ignore"],
    });
    return ref;
  } catch {
    throw new Error(`Unable to resolve git commit for ref "${ref}"`);
  }
};

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
    removedExports: removedExports.sort(compareStrings),
    addedExports: addedExports.sort(compareStrings),
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

export const collectBaselineNextExports = (
  rootDir: string,
  baseRef: string
): Set<string> => {
  const validRef = validateGitRef(rootDir, baseRef);
  let filesOut = "";
  try {
    filesOut = execFileSync(
      "git",
      ["ls-tree", "-r", "--name-only", validRef, "--", "packages/react/src/next"],
      {
        cwd: rootDir,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      }
    );
  } catch {
    return new Set<string>();
  }

  const files = filesOut
    .split("\n")
    .map((f) => f.trim())
    .filter((f) => f.startsWith("packages/react/src/next/"));

  if (files.length === 0) {
    return new Set<string>();
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nimbus-next-base-"));
  try {
    files.forEach((relFile) => {
      const content = execFileSync("git", ["show", `${validRef}:${relFile}`], {
        cwd: rootDir,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });
      const destPath = path.join(tmpDir, relFile);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.writeFileSync(destPath, content, "utf8");
    });

    return collectCurrentNextExports(tmpDir);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
};

if (require.main === module) {
  const rootDir = path.resolve(__dirname, "..");
  const args = process.argv.slice(2);
  let baseRef = resolveDefaultBaseRef(rootDir);
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === "--base-ref" && args[i + 1]) {
      baseRef = args[i + 1];
      i += 1;
    } else if (args[i].startsWith("--base-ref=")) {
      baseRef = args[i].split("=")[1];
    }
  }
  const allowBreaking = args.includes("--allow-breaking");

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
