// @ts-check

const branch = require("git-branch");
const { themes } = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const currentBranch = process.env.BRANCH || branch.sync();

/** @type {import('@docusaurus/types').Config} */
const config = {
  themes: ["@docusaurus/theme-live-codeblock"],

  title: "React Google Charts",
  tagline: "A thin, typed, React wrapper for Google Charts",
  url: "https://www.react-google-charts.com/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo-v2.svg",
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
          src: "img/logo-v2.svg",
        },
        items: [
          {
            type: "doc",
            docId: "examples/index",
            position: "left",
            label: "Examples",
          },
          {
            href: "https://discord.gg/nNa2EEgUkS",
            label: "Discord",
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
      liveCodeBlock: {
        /**
         * The position of the live playground, above or under the editor
         * Possible values: "top" | "bottom"
         */
        playgroundPosition: "bottom",
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "6F6D5HVC1F",

        // Public API key: it is safe to commit it
        apiKey: "92d81a798940fa2a43a15193e60ea9ef",

        indexName: "react-google-charts",

        // Optional: whether the insights feature is enabled or not on Docsearch
        insights: true,
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
    [
      "posthog-docusaurus",
      {
        apiKey: "phc_a4v2PPmMF7yAuSLzYQqi10zWR8StnhiardAM4dRfWKp",
        enableInDevelopment: true, // optional
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
          {
            to: "/examples/scatter-chart-material",
            from: ["/examples/scatter"],
          },
        ],
      },
    ],
  ],
};

module.exports = config;
