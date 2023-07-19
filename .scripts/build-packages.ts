import path from "path";
import glob from "glob";
import * as dotenv from "dotenv";
import { PackageBuilder } from "@nimbus-ds/scripts";

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

try {
  const paths = glob.sync(path.join(".yarn/versions/*.yml"));
  if (!paths.length) {
    throw new Error(
      "The versions file was not found so it was not possible to perform the build..."
    );
  }

  const packageBuilder = new PackageBuilder();
  const packagesToBuild = packageBuilder.getPackagesToBuild(paths[0]);

  const removePackages = ["nimbus-patterns", "@nimbus-ds/webpack"];

  const command = packageBuilder.getCommmandBuildNPM(
    packagesToBuild,
    removePackages
  );
  packageBuilder.execCommand(command);
} catch (err) {
  console.error(`\x1b[33m ${err.message} \x1b[0m`);
  process.exit(1);
}
