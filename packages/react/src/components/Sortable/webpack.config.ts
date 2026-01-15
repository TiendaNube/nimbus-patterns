import path from "path";
import { configuration } from "@nimbus-ds/patterns-webpack/src";

const config = {
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/sortable",
  },
};

// Skip lib check for Sortable. This is to avoid DND Kit type errors.
const dtsBundleConfig = {
  entries: [
    "node ../../../../../node_modules/.bin/dts-bundle-generator -o ./dist/index.d.ts ./src/index.ts --external-imports @dnd-kit/core --external-imports @dnd-kit/sortable --external-imports @dnd-kit/utilities --no-check",
  ],
};

export default () =>
  configuration.getConfiguration(config, { dtsBundleConfig });
