import path from "node:path";
import { configuration } from "@nimbus-ds/patterns-webpack/src";

const config = {
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/summary-stats",
  },
};

export default () => configuration.getConfiguration(config);
