import { dirname, join } from "path";
const path = require("path");

module.exports = {
  stories: ["../stories/*.tsx"],

  addons: [
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-controls"),
    getAbsolutePath("@storybook/addon-actions"),
    getAbsolutePath("@storybook/addon-webpack5-compiler-babel"),
    getAbsolutePath("@chromatic-com/storybook"),
  ],

  webpackFinal(config) {
    config.resolve.alias["react-google-charts"] = path.resolve(
      __dirname,
      "../src",
    );
    return config;
  },

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },

  babel: async (options) => {
    return {
      ...options,
      presets: [
        ...(options.presets ?? []),
        "@babel/preset-react",
        "@babel/preset-typescript",
      ],
    };
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
