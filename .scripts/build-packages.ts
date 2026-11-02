import path from "path";
import glob from "glob";
import * as dotenv from "dotenv";
import { PackageBuilder } from "../packages/core/scripts/src/packageBuilder";

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

try {
  const args = process.argv.slice(2);
  const buildAll = args.includes("--all") || args.includes("--all-packages");

  const packageBuilder = new PackageBuilder();
  const paths = glob.sync(path.join(".yarn/versions/*.yml")).sort();

  const removePackages = [
    "nimbus-patterns",
    "@nimbus-ds/webpack",
    "@nimbus-ds/patterns-webpack",
  ];

  let packagesToBuild: string[] = [];

  if (buildAll) {
    const manifestPackages = paths.length
      ? packageBuilder.getPackagesToBuildFromPaths(paths)
      : [];
    packagesToBuild = Array.from(
      new Set(["@nimbus-ds/patterns", ...manifestPackages])
    );
  } else {
    if (!paths.length) {
      console.log(
        "No version manifest files found in .yarn/versions/*.yml. Skipping package build (pass --all to build @nimbus-ds/patterns)."
      );
      process.exit(0);
    }
    packagesToBuild = packageBuilder.getPackagesToBuildFromPaths(paths);
  }

  const buildablePackages = packagesToBuild.filter(
    (pkg) => !removePackages.includes(pkg)
  );

  if (!buildablePackages.length) {
    console.log("No eligible packages to build from version manifests.");
    process.exit(0);
  }

  const command = packageBuilder.getCommandBuildNPM(
    buildablePackages,
    removePackages
  );
  packageBuilder.execCommand(command);
} catch (err: any) {
  console.error(`\x1b[33m ${err.message} \x1b[0m`);
  process.exit(1);
}
