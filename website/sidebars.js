// @ts-check

const { docs } = require("./docs/docs");
const { docs: components } = require("./docs/components/docs");
const { docs: examples } = require("./docs/examples/docs");

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: "doc",
      id: "index",
      label: "Introduction",
    },
    ...docs.map(({ slug, title }) => ({
      /** @type {'doc'} */
      type: "doc",
      id: slug.replace("/docs/", ""),
      label: title,
    })),
  ],
  componentsSidebar: [
    {
      type: "doc",
      id: "components/index",
      label: "Table of Contents",
    },
    ...components.map(({ slug, title }) => ({
      /** @type {'doc'} */
      type: "doc",
      id: slug.replace("/", ""),
      label: title,
    })),
  ],
  examplesSidebar: [
    {
      type: "doc",
      id: "examples/index",
      label: "Table of Contents",
    },
    ...examples.map(({ slug, title }) => ({
      /** @type {'doc'} */
      type: "doc",
      id: slug.replace("/", ""),
      label: title,
    })),
  ],
};

module.exports = sidebars;
