// @ts-check

const branch = require("git-branch");
const { themes } = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

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
        // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-gtag
        gtag: {
          trackingID: "UA-123404567-1",
          anonymizeIP: true,
        },
        docs: {
          routeBasePath: "/",
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
    // Client-side redirect is not ideal, just adding this temporarily to avoid broken links.
    // TODO: Migrate to server-side redirect
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/examples/bar-chart-material",
            from: ["/examples/bar"],
          },
          {
            to: "/examples/line-chart-material",
            from: ["/examples/line"],
          },
        ],
      },
    ],
  ],
};

module.exports = config;
