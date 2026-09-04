import { runPreviewLinksCli } from "@nimbus-ds/scripts";

/**
 * Thin CLI wrapper: the actual resolution logic lives in `@nimbus-ds/scripts`
 * (nimbus-design-system's packages/core/scripts/src/storybookPreviewLinks),
 * shared with that repo's own wrapper of the same name. This file only
 * supplies this repo's component-tree layout — flat, no atomic/composite
 * split, no separate styles package.
 *
 * Unlike nimbus-design-system's own wrapper, this repo consumes the package
 * from npm, not from a workspace — so this imports from its published root
 * (`dist/index.js`), not from a `/src` subpath the npm tarball doesn't ship.
 *
 * Usage (reads the changed file list from a file, or from stdin):
 *   STORYBOOK_URL=https://host/index.html yarn preview:links changed-files.txt
 */
runPreviewLinksCli({
  componentRootPattern: /^packages\/react\/src\/components\/[^/]+/,
});
