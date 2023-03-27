const fs = require("fs");
const path = require("path");
const glob = require("glob");
const { execSync } = require("child_process");

const run = () => {
  execSync("git diff --name-only origin/master > ./.scripts/diff.txt");
  const diff = glob.sync(path.join("./.scripts/diff.txt"));
  if (!diff.length) {
    throw new Error(
      "The versions file was not found so it was not possible to perform the build..."
    );
  }
  const content = fs.readFileSync(diff[0], "utf8");
  execSync("rm -rf .yarn/versions");
  console.log(`\x1b[32m 🏃‍♂️ Generating versions for packages... \x1b[0m`);

  execSync("yarn version -d decline");
  content
    ?.match(/packages\/react\/\w+?-?\w+\/package\.json/gm)
    ?.reduce((prev, curr) => {
      const packageDir = curr.replace("/package.json", "");
      execSync("yarn version -d minor", { cwd: packageDir });
      return prev;
    }, "");
  execSync("rm -rf ./.scripts/diff.txt");
  console.log(`\x1b[32m 🏃‍♂️ Checking versions... \x1b[0m`);
  execSync("yarn bump:check");
};

try {
  run();
} catch (err) {
  console.error(`\x1b[33m ${err.message} \x1b[0m`);
  process.exit(1);
}
