(window.webpackJsonp = window.webpackJsonp || []).push([
  [4],
  {
    "./src/docs/BubbleChart.mdx": function(e, a, t) {
      "use strict";
      t.r(a);
      var n = t("./node_modules/react/index.js"),
        o = t.n(n),
        r = t("./node_modules/@mdx-js/tag/dist/index.js"),
        i = t("./node_modules/docz/dist/index.m.js"),
        l = t("./src/index.tsx");
      a.default = function(e) {
        var a = e.components;
        return o.a.createElement(
          r.MDXTag,
          { name: "wrapper", components: a },
          o.a.createElement(
            r.MDXTag,
            { name: "h1", components: a, props: { id: "usage" } },
            o.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: a,
                parentName: "h1",
                props: { "aria-hidden": !0, href: "#usage" }
              },
              o.a.createElement(
                r.MDXTag,
                {
                  name: "span",
                  components: a,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Usage"
          ),
          o.a.createElement(
            r.MDXTag,
            { name: "h2", components: a, props: { id: "series-example" } },
            o.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: a,
                parentName: "h2",
                props: { "aria-hidden": !0, href: "#series-example" }
              },
              o.a.createElement(
                r.MDXTag,
                {
                  name: "span",
                  components: a,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Series Example"
          ),
          o.a.createElement(
            i.d,
            {
              __position: 0,
              __code:
                "<Chart\n  width={'500px'}\n  height={'300px'}\n  chartType=\"BubbleChart\"\n  loader={<div>Loading Chart</div>}\n  data={[\n    ['ID', 'Life Expectancy', 'Fertility Rate', 'Region', 'Population'],\n    ['CAN', 80.66, 1.67, 'North America', 33739900],\n    ['DEU', 79.84, 1.36, 'Europe', 81902307],\n    ['DNK', 78.6, 1.84, 'Europe', 5523095],\n    ['EGY', 72.73, 2.78, 'Middle East', 79716203],\n    ['GBR', 80.05, 2, 'Europe', 61801570],\n    ['IRN', 72.49, 1.7, 'Middle East', 73137148],\n    ['IRQ', 68.09, 4.77, 'Middle East', 31090763],\n    ['ISR', 81.55, 2.96, 'Middle East', 7485600],\n    ['RUS', 68.6, 1.54, 'Europe', 141850000],\n    ['USA', 78.09, 2.05, 'North America', 307007000],\n  ]}\n  options={{\n    title:\n      'Correlation between life expectancy, fertility rate ' +\n      'and population of some world countries (2010)',\n    hAxis: { title: 'Life Expectancy' },\n    vAxis: { title: 'Fertility Rate' },\n    bubble: { textStyle: { fontSize: 11 } },\n  }}\n/>"
            },
            o.a.createElement(l.a, {
              width: "500px",
              height: "300px",
              chartType: "BubbleChart",
              loader: o.a.createElement("div", null, "Loading Chart"),
              data: [
                [
                  "ID",
                  "Life Expectancy",
                  "Fertility Rate",
                  "Region",
                  "Population"
                ],
                ["CAN", 80.66, 1.67, "North America", 33739900],
                ["DEU", 79.84, 1.36, "Europe", 81902307],
                ["DNK", 78.6, 1.84, "Europe", 5523095],
                ["EGY", 72.73, 2.78, "Middle East", 79716203],
                ["GBR", 80.05, 2, "Europe", 61801570],
                ["IRN", 72.49, 1.7, "Middle East", 73137148],
                ["IRQ", 68.09, 4.77, "Middle East", 31090763],
                ["ISR", 81.55, 2.96, "Middle East", 7485600],
                ["RUS", 68.6, 1.54, "Europe", 14185e4],
                ["USA", 78.09, 2.05, "North America", 307007e3]
              ],
              options: {
                title:
                  "Correlation between life expectancy, fertility rate and population of some world countries (2010)",
                hAxis: { title: "Life Expectancy" },
                vAxis: { title: "Fertility Rate" },
                bubble: { textStyle: { fontSize: 11 } }
              }
            })
          ),
          o.a.createElement(
            r.MDXTag,
            { name: "h2", components: a, props: { id: "color-by-numbers" } },
            o.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: a,
                parentName: "h2",
                props: { "aria-hidden": !0, href: "#color-by-numbers" }
              },
              o.a.createElement(
                r.MDXTag,
                {
                  name: "span",
                  components: a,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Color By Numbers"
          ),
          o.a.createElement(
            i.d,
            {
              __position: 1,
              __code:
                "<Chart\n  width={'500px'}\n  height={'300px'}\n  chartType=\"BubbleChart\"\n  loader={<div>Loading Chart</div>}\n  data={[\n    ['ID', 'X', 'Y', 'Temperature'],\n    ['', 80, 167, 120],\n    ['', 79, 136, 130],\n    ['', 78, 184, 50],\n    ['', 72, 278, 230],\n    ['', 81, 200, 210],\n    ['', 72, 170, 100],\n    ['', 68, 477, 80],\n  ]}\n  options={{\n    colorAxis: { colors: ['yellow', 'red'] },\n  }}\n/>"
            },
            o.a.createElement(l.a, {
              width: "500px",
              height: "300px",
              chartType: "BubbleChart",
              loader: o.a.createElement("div", null, "Loading Chart"),
              data: [
                ["ID", "X", "Y", "Temperature"],
                ["", 80, 167, 120],
                ["", 79, 136, 130],
                ["", 78, 184, 50],
                ["", 72, 278, 230],
                ["", 81, 200, 210],
                ["", 72, 170, 100],
                ["", 68, 477, 80]
              ],
              options: { colorAxis: { colors: ["yellow", "red"] } }
            })
          ),
          o.a.createElement(
            r.MDXTag,
            { name: "h2", components: a, props: { id: "custom-labels" } },
            o.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: a,
                parentName: "h2",
                props: { "aria-hidden": !0, href: "#custom-labels" }
              },
              o.a.createElement(
                r.MDXTag,
                {
                  name: "span",
                  components: a,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Custom Labels"
          ),
          o.a.createElement(
            i.d,
            {
              __position: 2,
              __code:
                "<Chart\n  width={'500px'}\n  height={'300px'}\n  chartType=\"BubbleChart\"\n  loader={<div>Loading Chart</div>}\n  data={[\n    ['ID', 'Life Expectancy', 'Fertility Rate', 'Region', 'Population'],\n    ['CAN', 80.66, 1.67, 'North America', 33739900],\n    ['DEU', 79.84, 1.36, 'Europe', 81902307],\n    ['DNK', 78.6, 1.84, 'Europe', 5523095],\n    ['EGY', 72.73, 2.78, 'Middle East', 79716203],\n    ['GBR', 80.05, 2, 'Europe', 61801570],\n    ['IRN', 72.49, 1.7, 'Middle East', 73137148],\n    ['IRQ', 68.09, 4.77, 'Middle East', 31090763],\n    ['ISR', 81.55, 2.96, 'Middle East', 7485600],\n    ['RUS', 68.6, 1.54, 'Europe', 141850000],\n    ['USA', 78.09, 2.05, 'North America', 307007000],\n  ]}\n  options={{\n    title:\n      'Correlation between life expectancy, fertility rate ' +\n      'and population of some world countries (2010)',\n    hAxis: { title: 'Life Expectancy' },\n    vAxis: { title: 'Fertility Rate' },\n    bubble: {\n      textStyle: {\n        fontSize: 12,\n        fontName: 'Times-Roman',\n        color: 'green',\n        bold: true,\n        italic: true,\n        auraColor: 'none',\n      },\n    },\n  }}\n/>"
            },
            o.a.createElement(l.a, {
              width: "500px",
              height: "300px",
              chartType: "BubbleChart",
              loader: o.a.createElement("div", null, "Loading Chart"),
              data: [
                [
                  "ID",
                  "Life Expectancy",
                  "Fertility Rate",
                  "Region",
                  "Population"
                ],
                ["CAN", 80.66, 1.67, "North America", 33739900],
                ["DEU", 79.84, 1.36, "Europe", 81902307],
                ["DNK", 78.6, 1.84, "Europe", 5523095],
                ["EGY", 72.73, 2.78, "Middle East", 79716203],
                ["GBR", 80.05, 2, "Europe", 61801570],
                ["IRN", 72.49, 1.7, "Middle East", 73137148],
                ["IRQ", 68.09, 4.77, "Middle East", 31090763],
                ["ISR", 81.55, 2.96, "Middle East", 7485600],
                ["RUS", 68.6, 1.54, "Europe", 14185e4],
                ["USA", 78.09, 2.05, "North America", 307007e3]
              ],
              options: {
                title:
                  "Correlation between life expectancy, fertility rate and population of some world countries (2010)",
                hAxis: { title: "Life Expectancy" },
                vAxis: { title: "Fertility Rate" },
                bubble: {
                  textStyle: {
                    fontSize: 12,
                    fontName: "Times-Roman",
                    color: "green",
                    bold: !0,
                    italic: !0,
                    auraColor: "none"
                  }
                }
              }
            })
          ),
          o.a.createElement(
            r.MDXTag,
            { name: "h1", components: a, props: { id: "data-format" } },
            o.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: a,
                parentName: "h1",
                props: { "aria-hidden": !0, href: "#data-format" }
              },
              o.a.createElement(
                r.MDXTag,
                {
                  name: "span",
                  components: a,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Data Format"
          ),
          o.a.createElement(
            r.MDXTag,
            { name: "p", components: a },
            o.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: a,
                parentName: "p",
                props: {
                  href:
                    "https://developers.google.com/chart/interactive/docs/gallery/bubblechart#data-format"
                }
              },
              "Complete Data Format Reference"
            )
          ),
          o.a.createElement(
            r.MDXTag,
            { name: "h1", components: a, props: { id: "reference" } },
            o.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: a,
                parentName: "h1",
                props: { "aria-hidden": !0, href: "#reference" }
              },
              o.a.createElement(
                r.MDXTag,
                {
                  name: "span",
                  components: a,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Reference"
          ),
          o.a.createElement(
            r.MDXTag,
            { name: "p", components: a },
            o.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: a,
                parentName: "p",
                props: {
                  href:
                    "https://developers.google.com/chart/interactive/docs/gallery/bubblechart"
                }
              },
              "Original Google Charts Docs"
            )
          )
        );
      };
    }
  }
]);
