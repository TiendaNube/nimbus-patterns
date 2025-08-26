import path from "path";
import fs from "fs";

export const convertTsConfigPathsToWebpackAliases = () => {
  const rootDir = path.resolve(__dirname, "../");
  const tsconfig = require("../tsconfig.json");
  const tsconfigPaths = Object.entries(tsconfig.compilerOptions.paths);
  const paths = tsconfigPaths.reduce((aliases: Record<string, string>, [realPath, mappedPath]: any) => {
    const target: string = mappedPath[0];
    const absoluteTarget = path.join(rootDir, target);

    let aliasPath = absoluteTarget;

    if (absoluteTarget.endsWith("/src")) {
      const packageDir = path.basename(path.dirname(absoluteTarget));
      const candidate = path.join(absoluteTarget, `${packageDir}.tsx`);
      if (fs.existsSync(candidate)) {
        aliasPath = candidate;
      }
    }

    aliases[realPath] = aliasPath;
    return aliases;
  }, {} as Record<string, string>);

  return paths;
};
