import path from "path";
import { configuration } from "@nimbus-ds/patterns-webpack/src";

const config = {
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/sidemodal",
  },
};

export default () => configuration.getConfiguration(config);