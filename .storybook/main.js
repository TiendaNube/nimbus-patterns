const path = require("path");

module.exports = {
  core: {
    builder: {
      name: "webpack5",
      options: {
        lazyCompilation: true,
      },
    },
  },
  stories: [
    "../packages/react/**/*.stories.mdx",
    "../packages/react/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-controls",
    "storybook-dark-mode",
  ],
  framework: "@storybook/react",
  // we need to add aliases to webpack so it knows how to follow
  // to the source of the packages rather than the built version (dist)
  webpackFinal: async (baseConfig) => {
    const { module = {}, plugins = {}, resolve = {} } = baseConfig;

    return {
      ...baseConfig,
      plugins: [...plugins],
      resolve: {
        ...resolve,
        alias: {
          ...resolve.alias,
          ...convertTsConfigPathsToWebpackAliases(),
        },
      },
    };
  },
};

const convertTsConfigPathsToWebpackAliases = () => {
  const rootDir = path.resolve(__dirname, "../");
  const tsconfig = require("../tsconfig.json");
  const tsconfigPaths = Object.entries(tsconfig.compilerOptions.paths);

  const paths = tsconfigPaths.reduce((aliases, [realPath, mappedPath]) => {
    const packageName = mappedPath[0].split("/")[5];
    const alias = `${mappedPath[0]}/${packageName}.tsx`;
    aliases[realPath] = path.join(rootDir, alias);
    return aliases;
  }, {});

  return paths;
};
