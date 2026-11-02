import fs from "fs";
import path from "path";
import { execSync } from "child_process";

/* eslint no-console: "off" */

export interface BaseInvarianceOptions {
  rootDir?: string;
  baseRef?: string;
  allowBaseChanges?: boolean;
  skipJest?: boolean;
}

export const extractCssCustomProperties = (cssContent: string): Set<string> => {
  const props = new Set<string>();
  const regex = /(--nimbus-[a-zA-Z0-9-_]+)\s*:/g;
  for (const match of cssContent.matchAll(regex)) {
    props.add(match[1]);
  }
  return props;
};

export const verifyStylesThemeContracts = (rootDir: string): void => {
  const stylesDistDir = path.join(
    rootDir,
    "node_modules/@nimbus-ds/styles/dist"
  );
  const indexCssPath = path.join(stylesDistDir, "index.css");
  const darkCssPath = path.join(stylesDistDir, "themes/dark.css");

  if (!fs.existsSync(indexCssPath)) {
    throw new Error(`Missing @nimbus-ds/styles index.css at ${indexCssPath}`);
  }
  if (!fs.existsSync(darkCssPath)) {
    throw new Error(`Missing @nimbus-ds/styles dark.css at ${darkCssPath}`);
  }

  const indexCss = fs.readFileSync(indexCssPath, "utf8");
  const darkCss = fs.readFileSync(darkCssPath, "utf8");

  const baseVars = extractCssCustomProperties(indexCss);
  const darkVars = extractCssCustomProperties(darkCss);

  if (baseVars.size === 0 || darkVars.size === 0) {
    throw new Error(
      "Failed to extract --nimbus-* CSS custom properties from @nimbus-ds/styles."
    );
  }

  const missingInDark: string[] = [];
  darkVars.forEach((v) => {
    if (!baseVars.has(v)) {
      missingInDark.push(v);
    }
  });

  if (missingInDark.length > 0) {
    throw new Error(
      `Theme contract mismatch between base and dark: ${missingInDark.join(
        ", "
      )}`
    );
  }
};

export const verifyNoUnexpectedBaseComponentChanges = (
  rootDir: string,
  baseRef: string,
  allowBaseChanges = false
): string[] => {
  if (allowBaseChanges) {
    return [];
  }

  let diffOutput = "";
  try {
    diffOutput = execSync(`git diff --name-only ${baseRef}...HEAD`, {
      cwd: rootDir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch {
    diffOutput = execSync(`git diff --name-only ${baseRef}`, {
      cwd: rootDir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  }

  const changedFiles = diffOutput
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const hasNextChanges = changedFiles.some((f) =>
    f.startsWith("packages/react/src/next/")
  );
  const baseComponentChanges = changedFiles.filter((f) =>
    f.startsWith("packages/react/src/components/")
  );

  if (hasNextChanges && baseComponentChanges.length > 0) {
    throw new Error(
      `Base invariance violation: files under packages/react/src/components/ were modified alongside /next changes:\n${baseComponentChanges
        .map((f) => `  - ${f}`)
        .join("\n")}`
    );
  }

  return baseComponentChanges;
};

export const runBaseInvarianceCheck = (
  options: BaseInvarianceOptions = {}
): void => {
  const rootDir = options.rootDir ?? path.resolve(__dirname, "..");

  if (options.baseRef) {
    verifyNoUnexpectedBaseComponentChanges(
      rootDir,
      options.baseRef,
      options.allowBaseChanges
    );
  }

  verifyStylesThemeContracts(rootDir);

  if (!options.skipJest) {
    execSync(
      "npx jest packages/react/src/__tests__/base-invariance.spec.tsx --no-cache --runInBand",
      {
        cwd: rootDir,
        stdio: "inherit",
      }
    );
  }
};

if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    let baseRef: string | undefined;
    for (let i = 0; i < args.length; i += 1) {
      if (args[i] === "--base-ref" && args[i + 1]) {
        baseRef = args[i + 1];
        i += 1;
      } else if (args[i].startsWith("--base-ref=")) {
        baseRef = args[i].split("=")[1];
      }
    }
    const allowBaseChanges = args.includes("--allow-base-changes");
    const skipJest = args.includes("--skip-jest");

    runBaseInvarianceCheck({
      baseRef,
      allowBaseChanges,
      skipJest,
    });
    console.log("✅ Base invariance check passed.");
  } catch (error: any) {
    console.error(`❌ ${error?.message || String(error)}`);
    process.exit(1);
  }
}
