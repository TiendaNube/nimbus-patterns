import path from "path";
import { configuration } from "@nimbus-ds/patterns-webpack/src";

const config = {
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/calendar",
  },
};

// Skip lib check for Sortable. This is to avoid React Day Picker type errors.
const dtsBundleConfig = {
  entries: [
    "node ../../../../../node_modules/.bin/dts-bundle-generator -o ./dist/index.d.ts ./src/index.ts --external-imports react-day-picker --no-check",
  ],
};

export default () =>
  configuration.getConfiguration(config, { dtsBundleConfig });
