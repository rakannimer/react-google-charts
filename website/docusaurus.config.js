// @ts-check

const branch = require("git-branch");
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const currentBranch = process.env.BRANCH || branch.sync();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "React Google Charts",
  tagline: "A thin, typed, React wrapper for Google Charts",
  url: "https://react-google-charts.com/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "RakanNimer",
  projectName: "react-google-charts",
  noIndex: currentBranch !== "master",

  customFields: {
    branch: currentBranch,
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/RakanNimer/react-google-charts/edit/master/website/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "React Google Charts",
        logo: {
          alt: "React Google Charts logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "components/index",
            position: "left",
            label: "Components",
          },
          {
            type: "doc",
            docId: "examples/index",
            position: "left",
            label: "Examples",
          },
          {
            href: "https://slack.cube.dev/?ref=eco-react-google-charts",
            label: "Slack",
            position: "right",
          },
          {
            href: "https://stackoverflow.com/questions/tagged/react-google-charts",
            label: "Stack Overflow",
            position: "right",
          },
          {
            href: "https://github.com/RakanNimer/react-google-charts",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      gtag: {
        trackingID: "UA-123404567-1",
      },
      // algolia: {
      //   appId: 'BH4D9OD16A',
      //   apiKey: 'd59187de89e7935f588bbb2fc9273f03',
      //   indexName: 'react-google-charts-2',
      // },
    }),

  plugins: [
    [
      "docusaurus-plugin-react-docgen-typescript",
      {
        src: "../src/**/*.tsx",
        parserOptions: {
          propFilter: (prop) => {
            if (prop.parent) {
              return !prop.parent.fileName.includes("@types/react");
            }

            return true;
          },
        },
      },
    ],
  ],
};

module.exports = config;
