import * as path from "path";
import { runSourceMapCli } from "@nimbus-ds/scripts";

/**
 * Thin CLI wrapper: the actual generator lives in `@nimbus-ds/scripts`
 * (nimbus-design-system's packages/core/scripts/src/sourceMap), shared with
 * that repo's own wrapper of the same name. This file only supplies this
 * repo's layout — flat, no atomic/composite split.
 *
 * Unlike nimbus-design-system's own wrapper, this repo consumes the package
 * from npm, not from a workspace — so this imports from its published root
 * (`dist/index.js`), not from a `/src` subpath the npm tarball doesn't ship.
 * Same reasoning as `.scripts/storybook-preview-links.ts`.
 *
 * Usage:
 *   yarn source-map          # regenerate nimbus-source-map.yml
 *   yarn source-map --check  # fail if the committed file is stale (CI)
 */
runSourceMapCli({
  repoName: "nimbus-patterns",
  cwd: path.resolve(__dirname, ".."),
  groups: {
    patterns: "packages/react/src/components",
  },
  commands: {
    install: "yarn install --immutable",
    buildAll: "yarn build:all",
    testAll: "yarn test",
    lint: "yarn lint",
    typesCheck: "yarn types:check",
    storybook: "yarn storybook",
    buildStorybook: "yarn build:storybook",
    buildOne: "yarn workspace {package} build",
    testOne: "yarn jest {path}",
  },
  shared: {},
  newComponentReference: "packages/react/src/components/AppShell",
  storybookIndexPath: ".build-storybook/index.json",
});
