import fs from "fs";
import path from "path";

/* eslint no-console: "off" */

const DEP_FIELDS = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
  "resolutions",
] as const;

// Historical internal build tooling package pinned prior to Next-Evolution
const LEGACY_ALLOWED_RC_PACKAGES = new Set(["@nimbus-ds/webpack"]);

export interface RcDepViolation {
  file: string;
  packageName: string;
  specifier: string;
  reason: string;
}

const isForbiddenSpecifier = (
  pkgName: string,
  specifier: string,
  allowLegacyBuildToolRc = true
): string | null => {
  const trimmed = specifier.trim();
  if (
    trimmed.startsWith("file:") ||
    trimmed.startsWith("link:") ||
    trimmed.startsWith("portal:")
  ) {
    return `Forbidden local protocol specifier "${trimmed}"`;
  }

  if (/-rc\.|-alpha\.|-beta\.|-next\./i.test(trimmed)) {
    if (allowLegacyBuildToolRc && LEGACY_ALLOWED_RC_PACKAGES.has(pkgName)) {
      return null;
    }
    return `Forbidden prerelease/RC specifier "${trimmed}"`;
  }

  return null;
};

const findPackageJsonFiles = (dir: string): string[] => {
  if (!fs.existsSync(dir)) {
    return [];
  }
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === "dist") {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findPackageJsonFiles(fullPath));
    } else if (entry.isFile() && entry.name === "package.json") {
      results.push(fullPath);
    }
  }
  return results;
};

export const checkNoRcDeps = (
  rootDir: string = path.resolve(__dirname, ".."),
  options: { allowLegacyBuildToolRc?: boolean } = {}
): RcDepViolation[] => {
  const allowLegacyBuildToolRc = options.allowLegacyBuildToolRc ?? true;
  const violations: RcDepViolation[] = [];

  const packageJsonPaths = [
    path.join(rootDir, "package.json"),
    ...findPackageJsonFiles(path.join(rootDir, "packages")),
  ];

  for (const pkgJsonPath of packageJsonPaths) {
    if (!fs.existsSync(pkgJsonPath)) {
      continue;
    }
    const relFile = path.relative(rootDir, pkgJsonPath);
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));

    for (const field of DEP_FIELDS) {
      const deps = pkgJson[field];
      if (!deps || typeof deps !== "object") {
        continue;
      }
      for (const [depName, specifier] of Object.entries(deps)) {
        if (!depName.startsWith("@nimbus-ds/") || typeof specifier !== "string") {
          continue;
        }
        const reason = isForbiddenSpecifier(
          depName,
          specifier,
          allowLegacyBuildToolRc
        );
        if (reason) {
          violations.push({
            file: `${relFile} (${field})`,
            packageName: depName,
            specifier,
            reason,
          });
        }
      }
    }
  }

  const yarnLockPath = path.join(rootDir, "yarn.lock");
  if (fs.existsSync(yarnLockPath)) {
    const lockContent = fs.readFileSync(yarnLockPath, "utf8");
    const lines = lockContent.split("\n");
    lines.forEach((line, index) => {
      const match = line.match(
        /^\s*resolution:\s*"?(@nimbus-ds\/[^@"]+)@([^"]+)"?/
      );
      if (!match) {
        return;
      }
      const [, pkgName, resolutionSpec] = match;
      if (resolutionSpec.startsWith("workspace:")) {
        return;
      }
      const reason = isForbiddenSpecifier(
        pkgName,
        resolutionSpec,
        allowLegacyBuildToolRc
      );
      if (reason) {
        violations.push({
          file: `yarn.lock:${index + 1}`,
          packageName: pkgName,
          specifier: resolutionSpec,
          reason,
        });
      }
    });
  }

  return violations;
};

if (require.main === module) {
  const violations = checkNoRcDeps();
  if (violations.length > 0) {
    console.error(
      "❌ Forbidden RC or local file: dependencies on @nimbus-ds/* detected:"
    );
    violations.forEach((v) => {
      console.error(
        `  - ${v.file}: ${v.packageName} -> ${v.specifier} (${v.reason})`
      );
    });
    process.exit(1);
  }
  console.log("✅ No forbidden RC or file: dependencies on @nimbus-ds/* found.");
}
