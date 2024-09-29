const path = require("path");

module.exports = {
  stories: ["../stories/*.tsx"],

  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/addon-actions",
    "@storybook/addon-webpack5-compiler-babel",
    "@chromatic-com/storybook",
  ],

  webpackFinal(config) {
    config.resolve.alias["react-google-charts"] = path.resolve(
      __dirname,
      "../src",
    );
    return config;
  },

  framework: {
    name: "@storybook/react-webpack5",
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
