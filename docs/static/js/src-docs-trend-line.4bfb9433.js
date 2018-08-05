(window.webpackJsonp = window.webpackJsonp || []).push([
  [25],
  {
    "./src/docs/TrendLine.mdx": function(e, n, a) {
      "use strict";
      a.r(n);
      var t = a("./node_modules/react/index.js"),
        i = a.n(t),
        r = a("./node_modules/@mdx-js/tag/dist/index.js"),
        o = a("./node_modules/docz/dist/index.m.js"),
        s = a("./src/index.tsx");
      n.default = function(e) {
        var n = e.components;
        return i.a.createElement(
          r.MDXTag,
          { name: "wrapper", components: n },
          i.a.createElement(
            r.MDXTag,
            { name: "h1", components: n, props: { id: "usage" } },
            i.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h1",
                props: { "aria-hidden": !0, href: "#usage" }
              },
              i.a.createElement(
                r.MDXTag,
                {
                  name: "span",
                  components: n,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Usage"
          ),
          i.a.createElement(
            r.MDXTag,
            { name: "h2", components: n, props: { id: "linear-trendlines" } },
            i.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h2",
                props: { "aria-hidden": !0, href: "#linear-trendlines" }
              },
              i.a.createElement(
                r.MDXTag,
                {
                  name: "span",
                  components: n,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Linear TrendLines"
          ),
          i.a.createElement(
            o.d,
            {
              __position: 0,
              __code:
                "<Chart\n  width={'500px'}\n  height={'300px'}\n  chartType=\"ScatterChart\"\n  loader={<div>Loading Chart</div>}\n  data={[\n    ['Diameter', 'Age'],\n    [8, 37],\n    [4, 19.5],\n    [11, 52],\n    [4, 22],\n    [3, 16.5],\n    [6.5, 32.8],\n    [14, 72],\n  ]}\n  options={{\n    title: 'Age of sugar maples vs. trunk diameter, in inches',\n    hAxis: { title: 'Diameter' },\n    vAxis: { title: 'Age' },\n    legend: 'none',\n    trendlines: { 0: {} },\n  }}\n/>"
            },
            i.a.createElement(s.a, {
              width: "500px",
              height: "300px",
              chartType: "ScatterChart",
              loader: i.a.createElement("div", null, "Loading Chart"),
              data: [
                ["Diameter", "Age"],
                [8, 37],
                [4, 19.5],
                [11, 52],
                [4, 22],
                [3, 16.5],
                [6.5, 32.8],
                [14, 72]
              ],
              options: {
                title: "Age of sugar maples vs. trunk diameter, in inches",
                hAxis: { title: "Diameter" },
                vAxis: { title: "Age" },
                legend: "none",
                trendlines: { 0: {} }
              }
            })
          ),
          i.a.createElement(
            r.MDXTag,
            {
              name: "h2",
              components: n,
              props: { id: "exponential-trendlines" }
            },
            i.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h2",
                props: { "aria-hidden": !0, href: "#exponential-trendlines" }
              },
              i.a.createElement(
                r.MDXTag,
                {
                  name: "span",
                  components: n,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Exponential TrendLines"
          ),
          i.a.createElement(
            o.d,
            {
              __position: 1,
              __code:
                "<Chart\n  width={'500px'}\n  height={'300px'}\n  chartType=\"ScatterChart\"\n  loader={<div>Loading Chart</div>}\n  data={[['Generation', 'Descendants'], [0, 1], [1, 33], [2, 269], [3, 2013]]}\n  options={{\n    title: 'Descendants by Generation',\n    hAxis: { title: 'Generation', minValue: 0, maxValue: 3 },\n    vAxis: { title: 'Descendants', minValue: 0, maxValue: 2100 },\n\n    trendlines: {\n      0: {\n        type: 'exponential',\n        visibleInLegend: true,\n      },\n    },\n  }}\n/>"
            },
            i.a.createElement(s.a, {
              width: "500px",
              height: "300px",
              chartType: "ScatterChart",
              loader: i.a.createElement("div", null, "Loading Chart"),
              data: [
                ["Generation", "Descendants"],
                [0, 1],
                [1, 33],
                [2, 269],
                [3, 2013]
              ],
              options: {
                title: "Descendants by Generation",
                hAxis: { title: "Generation", minValue: 0, maxValue: 3 },
                vAxis: { title: "Descendants", minValue: 0, maxValue: 2100 },
                trendlines: { 0: { type: "exponential", visibleInLegend: !0 } }
              }
            })
          ),
          i.a.createElement(
            r.MDXTag,
            { name: "h2", components: n, props: { id: "changing-the-color" } },
            i.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h2",
                props: { "aria-hidden": !0, href: "#changing-the-color" }
              },
              i.a.createElement(
                r.MDXTag,
                {
                  name: "span",
                  components: n,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Changing The Color"
          ),
          i.a.createElement(
            o.d,
            {
              __position: 2,
              __code:
                "<Chart\n  width={'500px'}\n  height={'300px'}\n  chartType=\"ScatterChart\"\n  loader={<div>Loading Chart</div>}\n  data={[['Generation', 'Descendants'], [0, 1], [1, 33], [2, 269], [3, 2013]]}\n  options={{\n    title: 'Descendants by Generation',\n    hAxis: { title: 'Generation', minValue: 0, maxValue: 3 },\n    vAxis: { title: 'Descendants', minValue: 0, maxValue: 2100 },\n    trendlines: {\n      0: {\n        type: 'exponential',\n        color: 'green',\n      },\n    },\n  }}\n/>"
            },
            i.a.createElement(s.a, {
              width: "500px",
              height: "300px",
              chartType: "ScatterChart",
              loader: i.a.createElement("div", null, "Loading Chart"),
              data: [
                ["Generation", "Descendants"],
                [0, 1],
                [1, 33],
                [2, 269],
                [3, 2013]
              ],
              options: {
                title: "Descendants by Generation",
                hAxis: { title: "Generation", minValue: 0, maxValue: 3 },
                vAxis: { title: "Descendants", minValue: 0, maxValue: 2100 },
                trendlines: { 0: { type: "exponential", color: "green" } }
              }
            })
          ),
          i.a.createElement(
            r.MDXTag,
            {
              name: "h2",
              components: n,
              props: { id: "polynomial-trendlines" }
            },
            i.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h2",
                props: { "aria-hidden": !0, href: "#polynomial-trendlines" }
              },
              i.a.createElement(
                r.MDXTag,
                {
                  name: "span",
                  components: n,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Polynomial TrendLines"
          ),
          i.a.createElement(
            o.d,
            {
              __position: 3,
              __code:
                "<Chart\n  width={'500px'}\n  height={'300px'}\n  chartType=\"ScatterChart\"\n  loader={<div>Loading Chart</div>}\n  data={[['Generation', 'Descendants'], [0, 1], [1, 33], [2, 269], [3, 2013]]}\n  options={{\n    title: 'Age vs. Weight comparison',\n    crosshair: { trigger: 'both', orientation: 'both' },\n    trendlines: {\n      0: {\n        type: 'polynomial',\n        degree: 3,\n        visibleInLegend: true,\n        labelInLegend: 'Trend',\n      },\n    },\n  }}\n/>"
            },
            i.a.createElement(s.a, {
              width: "500px",
              height: "300px",
              chartType: "ScatterChart",
              loader: i.a.createElement("div", null, "Loading Chart"),
              data: [
                ["Generation", "Descendants"],
                [0, 1],
                [1, 33],
                [2, 269],
                [3, 2013]
              ],
              options: {
                title: "Age vs. Weight comparison",
                crosshair: { trigger: "both", orientation: "both" },
                trendlines: {
                  0: {
                    type: "polynomial",
                    degree: 3,
                    visibleInLegend: !0,
                    labelInLegend: "Trend"
                  }
                }
              }
            })
          ),
          i.a.createElement(
            r.MDXTag,
            {
              name: "h2",
              components: n,
              props: { id: "changing-opacity-and-line-width" }
            },
            i.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h2",
                props: {
                  "aria-hidden": !0,
                  href: "#changing-opacity-and-line-width"
                }
              },
              i.a.createElement(
                r.MDXTag,
                {
                  name: "span",
                  components: n,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Changing Opacity And Line Width"
          ),
          i.a.createElement(
            o.d,
            {
              __position: 4,
              __code:
                "<Chart\n  width={'500px'}\n  height={'300px'}\n  chartType=\"ScatterChart\"\n  loader={<div>Loading Chart</div>}\n  data={[['Generation', 'Descendants'], [0, 1], [1, 33], [2, 269], [3, 2013]]}\n  options={{\n    legend: 'none',\n    title: 'Descendants by Generation',\n    hAxis: { title: 'Generation', minValue: 0, maxValue: 3 },\n    vAxis: { title: 'Descendants', minValue: 0, maxValue: 2100 },\n    trendlines: {\n      0: {\n        type: 'exponential',\n        color: 'purple',\n        lineWidth: 10,\n        opacity: 0.2,\n      },\n    },\n  }}\n/>"
            },
            i.a.createElement(s.a, {
              width: "500px",
              height: "300px",
              chartType: "ScatterChart",
              loader: i.a.createElement("div", null, "Loading Chart"),
              data: [
                ["Generation", "Descendants"],
                [0, 1],
                [1, 33],
                [2, 269],
                [3, 2013]
              ],
              options: {
                legend: "none",
                title: "Descendants by Generation",
                hAxis: { title: "Generation", minValue: 0, maxValue: 3 },
                vAxis: { title: "Descendants", minValue: 0, maxValue: 2100 },
                trendlines: {
                  0: {
                    type: "exponential",
                    color: "purple",
                    lineWidth: 10,
                    opacity: 0.2
                  }
                }
              }
            })
          ),
          i.a.createElement(
            r.MDXTag,
            { name: "h1", components: n, props: { id: "data-format" } },
            i.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h1",
                props: { "aria-hidden": !0, href: "#data-format" }
              },
              i.a.createElement(
                r.MDXTag,
                {
                  name: "span",
                  components: n,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Data Format"
          ),
          i.a.createElement(
            r.MDXTag,
            { name: "p", components: n },
            i.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "p",
                props: {
                  href:
                    "https://developers.google.com/chart/interactive/docs/gallery/trendlines#data-format"
                }
              },
              "Complete Data Format Reference"
            )
          ),
          i.a.createElement(
            r.MDXTag,
            { name: "h1", components: n, props: { id: "reference" } },
            i.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h1",
                props: { "aria-hidden": !0, href: "#reference" }
              },
              i.a.createElement(
                r.MDXTag,
                {
                  name: "span",
                  components: n,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Reference"
          ),
          i.a.createElement(
            r.MDXTag,
            { name: "p", components: n },
            i.a.createElement(
              r.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "p",
                props: {
                  href:
                    "https://developers.google.com/chart/interactive/docs/gallery/trendlines"
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
