import glob from "glob";
import path from "path";

import {
  Docgen,
  DocgenOptions,
  defaultCompilerOptionsDocgen,
} from "@nimbus-ds/scripts";
import tsconfig from "../tsconfig.json";

try {
  const paths = {
    components: glob.sync(
      path.join("packages/react/src/*/*/src/!(*.spec|*.stories).types.ts")
    ),
    subComponents: glob.sync(
      path.join(
        "packages/react/src/*/*/src/components/*/!(*.spec|*.stories).types.ts"
      )
    ),
  };

  const options: DocgenOptions = {
    compilerOptions: {
      ...defaultCompilerOptionsDocgen,
      paths: tsconfig.compilerOptions.paths,
    },
  };
  const docgen = new Docgen(options);
  docgen.generate(paths);
} catch (err) {
  console.log(err);
  console.error(`\x1b[33m ${err.message} \x1b[0m`);
  process.exit(1);
}
