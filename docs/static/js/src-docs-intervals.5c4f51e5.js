(window.webpackJsonp = window.webpackJsonp || []).push([
  [15],
  {
    "./src/docs/Intervals.mdx": function(e, n, t) {
      "use strict";
      t.r(n);
      var a = t("./node_modules/react/index.js"),
        r = t.n(a),
        i = t("./node_modules/@mdx-js/tag/dist/index.js"),
        l = t("./node_modules/docz/dist/index.m.js"),
        o = t("./src/index.tsx");
      n.default = function(e) {
        var n = e.components;
        return r.a.createElement(
          i.MDXTag,
          { name: "wrapper", components: n },
          r.a.createElement(
            i.MDXTag,
            { name: "h1", components: n, props: { id: "usage" } },
            r.a.createElement(
              i.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h1",
                props: { "aria-hidden": !0, href: "#usage" }
              },
              r.a.createElement(
                i.MDXTag,
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
          r.a.createElement(
            i.MDXTag,
            { name: "h2", components: n, props: { id: "line-intervals" } },
            r.a.createElement(
              i.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h2",
                props: { "aria-hidden": !0, href: "#line-intervals" }
              },
              r.a.createElement(
                i.MDXTag,
                {
                  name: "span",
                  components: n,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Line Intervals"
          ),
          r.a.createElement(
            l.d,
            {
              __position: 0,
              __code:
                "<Chart\n  width={'500px'}\n  height={'300px'}\n  chartType=\"LineChart\"\n  loader={<div>Loading Chart</div>}\n  data={[\n    [\n      { type: 'number', label: 'x' },\n      { type: 'number', label: 'values' },\n      { id: 'i0', type: 'number', role: 'interval' },\n      { id: 'i1', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n    ],\n    [1, 100, 90, 110, 85, 96, 104, 120],\n    [2, 120, 95, 130, 90, 113, 124, 140],\n    [3, 130, 105, 140, 100, 117, 133, 139],\n    [4, 90, 85, 95, 85, 88, 92, 95],\n    [5, 70, 74, 63, 67, 69, 70, 72],\n    [6, 30, 39, 22, 21, 28, 34, 40],\n    [7, 80, 77, 83, 70, 77, 85, 90],\n    [8, 100, 90, 110, 85, 95, 102, 110],\n  ]}\n  options={{\n    title: 'Line intervals, default',\n    curveType: 'function',\n    lineWidth: 4,\n    intervals: { style: 'line' },\n    legend: 'none',\n  }}\n/>"
            },
            r.a.createElement(o.a, {
              width: "500px",
              height: "300px",
              chartType: "LineChart",
              loader: r.a.createElement("div", null, "Loading Chart"),
              data: [
                [
                  { type: "number", label: "x" },
                  { type: "number", label: "values" },
                  { id: "i0", type: "number", role: "interval" },
                  { id: "i1", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" }
                ],
                [1, 100, 90, 110, 85, 96, 104, 120],
                [2, 120, 95, 130, 90, 113, 124, 140],
                [3, 130, 105, 140, 100, 117, 133, 139],
                [4, 90, 85, 95, 85, 88, 92, 95],
                [5, 70, 74, 63, 67, 69, 70, 72],
                [6, 30, 39, 22, 21, 28, 34, 40],
                [7, 80, 77, 83, 70, 77, 85, 90],
                [8, 100, 90, 110, 85, 95, 102, 110]
              ],
              options: {
                title: "Line intervals, default",
                curveType: "function",
                lineWidth: 4,
                intervals: { style: "line" },
                legend: "none"
              }
            })
          ),
          r.a.createElement(
            i.MDXTag,
            {
              name: "h2",
              components: n,
              props: { id: "line-intervals-tailored" }
            },
            r.a.createElement(
              i.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h2",
                props: { "aria-hidden": !0, href: "#line-intervals-tailored" }
              },
              r.a.createElement(
                i.MDXTag,
                {
                  name: "span",
                  components: n,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Line Intervals Tailored"
          ),
          r.a.createElement(
            l.d,
            {
              __position: 1,
              __code:
                "<Chart\n  width={'500px'}\n  height={'300px'}\n  chartType=\"LineChart\"\n  loader={<div>Loading Chart</div>}\n  data={[\n    [\n      { type: 'number', label: 'x' },\n      { type: 'number', label: 'values' },\n      { id: 'i0', type: 'number', role: 'interval' },\n      { id: 'i1', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n    ],\n    [1, 100, 90, 110, 85, 96, 104, 120],\n    [2, 120, 95, 130, 90, 113, 124, 140],\n    [3, 130, 105, 140, 100, 117, 133, 139],\n    [4, 90, 85, 95, 85, 88, 92, 95],\n    [5, 70, 74, 63, 67, 69, 70, 72],\n    [6, 30, 39, 22, 21, 28, 34, 40],\n    [7, 80, 77, 83, 70, 77, 85, 90],\n    [8, 100, 90, 110, 85, 95, 102, 110],\n  ]}\n  options={{\n    title: 'Line intervals, default',\n    curveType: 'function',\n    lineWidth: 4,\n    intervals: { style: 'line' },\n    legend: 'none',\n    // Difference here only with line intervals\n    interval: {\n      i0: { style: 'line', color: '#D3362D', lineWidth: 0.5 },\n      i1: { style: 'line', color: '#F1CA3A', lineWidth: 1 },\n      i2: { style: 'line', color: '#5F9654', lineWidth: 2 },\n    },\n  }}\n/>"
            },
            r.a.createElement(o.a, {
              width: "500px",
              height: "300px",
              chartType: "LineChart",
              loader: r.a.createElement("div", null, "Loading Chart"),
              data: [
                [
                  { type: "number", label: "x" },
                  { type: "number", label: "values" },
                  { id: "i0", type: "number", role: "interval" },
                  { id: "i1", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" }
                ],
                [1, 100, 90, 110, 85, 96, 104, 120],
                [2, 120, 95, 130, 90, 113, 124, 140],
                [3, 130, 105, 140, 100, 117, 133, 139],
                [4, 90, 85, 95, 85, 88, 92, 95],
                [5, 70, 74, 63, 67, 69, 70, 72],
                [6, 30, 39, 22, 21, 28, 34, 40],
                [7, 80, 77, 83, 70, 77, 85, 90],
                [8, 100, 90, 110, 85, 95, 102, 110]
              ],
              options: {
                title: "Line intervals, default",
                curveType: "function",
                lineWidth: 4,
                intervals: { style: "line" },
                legend: "none",
                interval: {
                  i0: { style: "line", color: "#D3362D", lineWidth: 0.5 },
                  i1: { style: "line", color: "#F1CA3A", lineWidth: 1 },
                  i2: { style: "line", color: "#5F9654", lineWidth: 2 }
                }
              }
            })
          ),
          r.a.createElement(
            i.MDXTag,
            { name: "h2", components: n, props: { id: "bar-intervals" } },
            r.a.createElement(
              i.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h2",
                props: { "aria-hidden": !0, href: "#bar-intervals" }
              },
              r.a.createElement(
                i.MDXTag,
                {
                  name: "span",
                  components: n,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Bar Intervals"
          ),
          r.a.createElement(
            l.d,
            {
              __position: 2,
              __code:
                "<Chart\n  width={'500px'}\n  height={'300px'}\n  chartType=\"LineChart\"\n  loader={<div>Loading Chart</div>}\n  data={[\n    [\n      { type: 'number', label: 'x' },\n      { type: 'number', label: 'values' },\n      { id: 'i0', type: 'number', role: 'interval' },\n      { id: 'i1', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n    ],\n    [1, 100, 90, 110, 85, 96, 104, 120],\n    [2, 120, 95, 130, 90, 113, 124, 140],\n    [3, 130, 105, 140, 100, 117, 133, 139],\n    [4, 90, 85, 95, 85, 88, 92, 95],\n    [5, 70, 74, 63, 67, 69, 70, 72],\n    [6, 30, 39, 22, 21, 28, 34, 40],\n    [7, 80, 77, 83, 70, 77, 85, 90],\n    [8, 100, 90, 110, 85, 95, 102, 110],\n  ]}\n  options={{\n    title: 'Bars, default',\n    curveType: 'function',\n    series: [{ color: '#D9544C' }],\n    intervals: { style: 'bars' },\n    legend: 'none',\n  }}\n/>"
            },
            r.a.createElement(o.a, {
              width: "500px",
              height: "300px",
              chartType: "LineChart",
              loader: r.a.createElement("div", null, "Loading Chart"),
              data: [
                [
                  { type: "number", label: "x" },
                  { type: "number", label: "values" },
                  { id: "i0", type: "number", role: "interval" },
                  { id: "i1", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" }
                ],
                [1, 100, 90, 110, 85, 96, 104, 120],
                [2, 120, 95, 130, 90, 113, 124, 140],
                [3, 130, 105, 140, 100, 117, 133, 139],
                [4, 90, 85, 95, 85, 88, 92, 95],
                [5, 70, 74, 63, 67, 69, 70, 72],
                [6, 30, 39, 22, 21, 28, 34, 40],
                [7, 80, 77, 83, 70, 77, 85, 90],
                [8, 100, 90, 110, 85, 95, 102, 110]
              ],
              options: {
                title: "Bars, default",
                curveType: "function",
                series: [{ color: "#D9544C" }],
                intervals: { style: "bars" },
                legend: "none"
              }
            })
          ),
          r.a.createElement(
            i.MDXTag,
            { name: "h2", components: n, props: { id: "box-intervals" } },
            r.a.createElement(
              i.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h2",
                props: { "aria-hidden": !0, href: "#box-intervals" }
              },
              r.a.createElement(
                i.MDXTag,
                {
                  name: "span",
                  components: n,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Box Intervals"
          ),
          r.a.createElement(
            l.d,
            {
              __position: 3,
              __code:
                "<Chart\n  width={'100%'}\n  height={'300px'}\n  chartType=\"LineChart\"\n  loader={<div>Loading Chart</div>}\n  data={[\n    [\n      { type: 'number', label: 'x' },\n      { type: 'number', label: 'values' },\n      { id: 'i0', type: 'number', role: 'interval' },\n      { id: 'i1', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n    ],\n    [1, 100, 90, 110, 85, 96, 104, 120],\n    [2, 120, 95, 130, 90, 113, 124, 140],\n    [3, 130, 105, 140, 100, 117, 133, 139],\n    [4, 90, 85, 95, 85, 88, 92, 95],\n    [5, 70, 74, 63, 67, 69, 70, 72],\n    [6, 30, 39, 22, 21, 28, 34, 40],\n    [7, 80, 77, 83, 70, 77, 85, 90],\n    [8, 100, 90, 110, 85, 95, 102, 110],\n  ]}\n  options={{\n    series: [{ color: '#1A8763' }],\n    intervals: { lineWidth: 1, barWidth: 1, style: 'boxes' },\n    legend: 'none',\n  }}\n/>"
            },
            r.a.createElement(o.a, {
              width: "100%",
              height: "300px",
              chartType: "LineChart",
              loader: r.a.createElement("div", null, "Loading Chart"),
              data: [
                [
                  { type: "number", label: "x" },
                  { type: "number", label: "values" },
                  { id: "i0", type: "number", role: "interval" },
                  { id: "i1", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" }
                ],
                [1, 100, 90, 110, 85, 96, 104, 120],
                [2, 120, 95, 130, 90, 113, 124, 140],
                [3, 130, 105, 140, 100, 117, 133, 139],
                [4, 90, 85, 95, 85, 88, 92, 95],
                [5, 70, 74, 63, 67, 69, 70, 72],
                [6, 30, 39, 22, 21, 28, 34, 40],
                [7, 80, 77, 83, 70, 77, 85, 90],
                [8, 100, 90, 110, 85, 95, 102, 110]
              ],
              options: {
                series: [{ color: "#1A8763" }],
                intervals: { lineWidth: 1, barWidth: 1, style: "boxes" },
                legend: "none"
              }
            })
          ),
          r.a.createElement(
            i.MDXTag,
            { name: "h2", components: n, props: { id: "stick-intervals" } },
            r.a.createElement(
              i.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h2",
                props: { "aria-hidden": !0, href: "#stick-intervals" }
              },
              r.a.createElement(
                i.MDXTag,
                {
                  name: "span",
                  components: n,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Stick Intervals"
          ),
          r.a.createElement(
            l.d,
            {
              __position: 4,
              __code:
                "<Chart\n  width={'100%'}\n  height={'300px'}\n  chartType=\"LineChart\"\n  loader={<div>Loading Chart</div>}\n  data={[\n    [\n      { type: 'number', label: 'x' },\n      { type: 'number', label: 'values' },\n      { id: 'i0', type: 'number', role: 'interval' },\n      { id: 'i1', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n    ],\n    [1, 100, 90, 110, 85, 96, 104, 120],\n    [2, 120, 95, 130, 90, 113, 124, 140],\n    [3, 130, 105, 140, 100, 117, 133, 139],\n    [4, 90, 85, 95, 85, 88, 92, 95],\n    [5, 70, 74, 63, 67, 69, 70, 72],\n    [6, 30, 39, 22, 21, 28, 34, 40],\n    [7, 80, 77, 83, 70, 77, 85, 90],\n    [8, 100, 90, 110, 85, 95, 102, 110],\n  ]}\n  options={{\n    title: 'Sticks, default',\n    curveType: 'function',\n    series: [{ color: '#E7711B' }],\n    intervals: { style: 'sticks' },\n    legend: 'none',\n  }}\n/>"
            },
            r.a.createElement(o.a, {
              width: "100%",
              height: "300px",
              chartType: "LineChart",
              loader: r.a.createElement("div", null, "Loading Chart"),
              data: [
                [
                  { type: "number", label: "x" },
                  { type: "number", label: "values" },
                  { id: "i0", type: "number", role: "interval" },
                  { id: "i1", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" }
                ],
                [1, 100, 90, 110, 85, 96, 104, 120],
                [2, 120, 95, 130, 90, 113, 124, 140],
                [3, 130, 105, 140, 100, 117, 133, 139],
                [4, 90, 85, 95, 85, 88, 92, 95],
                [5, 70, 74, 63, 67, 69, 70, 72],
                [6, 30, 39, 22, 21, 28, 34, 40],
                [7, 80, 77, 83, 70, 77, 85, 90],
                [8, 100, 90, 110, 85, 95, 102, 110]
              ],
              options: {
                title: "Sticks, default",
                curveType: "function",
                series: [{ color: "#E7711B" }],
                intervals: { style: "sticks" },
                legend: "none"
              }
            })
          ),
          r.a.createElement(
            i.MDXTag,
            { name: "h2", components: n, props: { id: "point-intervals" } },
            r.a.createElement(
              i.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h2",
                props: { "aria-hidden": !0, href: "#point-intervals" }
              },
              r.a.createElement(
                i.MDXTag,
                {
                  name: "span",
                  components: n,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Point Intervals"
          ),
          r.a.createElement(
            l.d,
            {
              __position: 5,
              __code:
                "<Chart\n  width={'100%'}\n  height={'300px'}\n  chartType=\"LineChart\"\n  loader={<div>Loading Chart</div>}\n  data={[\n    [\n      { type: 'number', label: 'x' },\n      { type: 'number', label: 'values' },\n      { id: 'i0', type: 'number', role: 'interval' },\n      { id: 'i1', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n    ],\n    [1, 100, 90, 110, 85, 96, 104, 120],\n    [2, 120, 95, 130, 90, 113, 124, 140],\n    [3, 130, 105, 140, 100, 117, 133, 139],\n    [4, 90, 85, 95, 85, 88, 92, 95],\n    [5, 70, 74, 63, 67, 69, 70, 72],\n    [6, 30, 39, 22, 21, 28, 34, 40],\n    [7, 80, 77, 83, 70, 77, 85, 90],\n    [8, 100, 90, 110, 85, 95, 102, 110],\n  ]}\n  options={{\n    title: 'Sticks, default',\n    curveType: 'function',\n    series: [{ color: '#E7711B' }],\n    intervals: { style: 'points', pointSize: 4 },\n    legend: 'none',\n  }}\n/>"
            },
            r.a.createElement(o.a, {
              width: "100%",
              height: "300px",
              chartType: "LineChart",
              loader: r.a.createElement("div", null, "Loading Chart"),
              data: [
                [
                  { type: "number", label: "x" },
                  { type: "number", label: "values" },
                  { id: "i0", type: "number", role: "interval" },
                  { id: "i1", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" }
                ],
                [1, 100, 90, 110, 85, 96, 104, 120],
                [2, 120, 95, 130, 90, 113, 124, 140],
                [3, 130, 105, 140, 100, 117, 133, 139],
                [4, 90, 85, 95, 85, 88, 92, 95],
                [5, 70, 74, 63, 67, 69, 70, 72],
                [6, 30, 39, 22, 21, 28, 34, 40],
                [7, 80, 77, 83, 70, 77, 85, 90],
                [8, 100, 90, 110, 85, 95, 102, 110]
              ],
              options: {
                title: "Sticks, default",
                curveType: "function",
                series: [{ color: "#E7711B" }],
                intervals: { style: "points", pointSize: 4 },
                legend: "none"
              }
            })
          ),
          r.a.createElement(
            i.MDXTag,
            { name: "h2", components: n, props: { id: "area-intervals" } },
            r.a.createElement(
              i.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h2",
                props: { "aria-hidden": !0, href: "#area-intervals" }
              },
              r.a.createElement(
                i.MDXTag,
                {
                  name: "span",
                  components: n,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Area Intervals"
          ),
          r.a.createElement(
            l.d,
            {
              __position: 6,
              __code:
                "<Chart\n  width={'100%'}\n  height={'300px'}\n  chartType=\"LineChart\"\n  loader={<div>Loading Chart</div>}\n  data={[\n    [\n      { type: 'number', label: 'x' },\n      { type: 'number', label: 'values' },\n      { id: 'i0', type: 'number', role: 'interval' },\n      { id: 'i1', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n    ],\n    [1, 100, 90, 110, 85, 96, 104, 120],\n    [2, 120, 95, 130, 90, 113, 124, 140],\n    [3, 130, 105, 140, 100, 117, 133, 139],\n    [4, 90, 85, 95, 85, 88, 92, 95],\n    [5, 70, 74, 63, 67, 69, 70, 72],\n    [6, 30, 39, 22, 21, 28, 34, 40],\n    [7, 80, 77, 83, 70, 77, 85, 90],\n    [8, 100, 90, 110, 85, 95, 102, 110],\n  ]}\n  options={{\n    title: 'Sticks, default',\n    curveType: 'function',\n    series: [{ color: '#E7711B' }],\n    intervals: { style: 'area' },\n    legend: 'none',\n  }}\n/>"
            },
            r.a.createElement(o.a, {
              width: "100%",
              height: "300px",
              chartType: "LineChart",
              loader: r.a.createElement("div", null, "Loading Chart"),
              data: [
                [
                  { type: "number", label: "x" },
                  { type: "number", label: "values" },
                  { id: "i0", type: "number", role: "interval" },
                  { id: "i1", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" }
                ],
                [1, 100, 90, 110, 85, 96, 104, 120],
                [2, 120, 95, 130, 90, 113, 124, 140],
                [3, 130, 105, 140, 100, 117, 133, 139],
                [4, 90, 85, 95, 85, 88, 92, 95],
                [5, 70, 74, 63, 67, 69, 70, 72],
                [6, 30, 39, 22, 21, 28, 34, 40],
                [7, 80, 77, 83, 70, 77, 85, 90],
                [8, 100, 90, 110, 85, 95, 102, 110]
              ],
              options: {
                title: "Sticks, default",
                curveType: "function",
                series: [{ color: "#E7711B" }],
                intervals: { style: "area" },
                legend: "none"
              }
            })
          ),
          r.a.createElement(
            i.MDXTag,
            {
              name: "h2",
              components: n,
              props: { id: "combining-interval-styles" }
            },
            r.a.createElement(
              i.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h2",
                props: { "aria-hidden": !0, href: "#combining-interval-styles" }
              },
              r.a.createElement(
                i.MDXTag,
                {
                  name: "span",
                  components: n,
                  parentName: "a",
                  props: { className: "icon-link" }
                },
                "#"
              )
            ),
            "Combining Interval Styles"
          ),
          r.a.createElement(
            l.d,
            {
              __position: 7,
              __code:
                "<Chart\n  width={'100%'}\n  height={'300px'}\n  chartType=\"LineChart\"\n  loader={<div>Loading Chart</div>}\n  data={[\n    [\n      { type: 'number', label: 'x' },\n      { type: 'number', label: 'values' },\n      { id: 'i0', type: 'number', role: 'interval' },\n      { id: 'i1', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n      { id: 'i2', type: 'number', role: 'interval' },\n    ],\n    [1, 100, 90, 110, 85, 96, 104, 120],\n    [2, 120, 95, 130, 90, 113, 124, 140],\n    [3, 130, 105, 140, 100, 117, 133, 139],\n    [4, 90, 85, 95, 85, 88, 92, 95],\n    [5, 70, 74, 63, 67, 69, 70, 72],\n    [6, 30, 39, 22, 21, 28, 34, 40],\n    [7, 80, 77, 83, 70, 77, 85, 90],\n    [8, 100, 90, 110, 85, 95, 102, 110],\n  ]}\n  options={{\n    title: 'Bar/area interval chart',\n    curveType: 'function',\n    intervals: { color: 'series-color' },\n    interval: {\n      i0: {\n        color: '#4374E0',\n        style: 'bars',\n        barWidth: 0,\n        lineWidth: 4,\n        pointSize: 10,\n        fillOpacity: 1,\n      },\n      i1: {\n        color: '#E49307',\n        style: 'bars',\n        barWidth: 0,\n        lineWidth: 4,\n        pointSize: 10,\n        fillOpacity: 1,\n      },\n      i2: { style: 'area', curveType: 'function', fillOpacity: 0.3 },\n    },\n    legend: 'none',\n  }}\n/>"
            },
            r.a.createElement(o.a, {
              width: "100%",
              height: "300px",
              chartType: "LineChart",
              loader: r.a.createElement("div", null, "Loading Chart"),
              data: [
                [
                  { type: "number", label: "x" },
                  { type: "number", label: "values" },
                  { id: "i0", type: "number", role: "interval" },
                  { id: "i1", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" },
                  { id: "i2", type: "number", role: "interval" }
                ],
                [1, 100, 90, 110, 85, 96, 104, 120],
                [2, 120, 95, 130, 90, 113, 124, 140],
                [3, 130, 105, 140, 100, 117, 133, 139],
                [4, 90, 85, 95, 85, 88, 92, 95],
                [5, 70, 74, 63, 67, 69, 70, 72],
                [6, 30, 39, 22, 21, 28, 34, 40],
                [7, 80, 77, 83, 70, 77, 85, 90],
                [8, 100, 90, 110, 85, 95, 102, 110]
              ],
              options: {
                title: "Bar/area interval chart",
                curveType: "function",
                intervals: { color: "series-color" },
                interval: {
                  i0: {
                    color: "#4374E0",
                    style: "bars",
                    barWidth: 0,
                    lineWidth: 4,
                    pointSize: 10,
                    fillOpacity: 1
                  },
                  i1: {
                    color: "#E49307",
                    style: "bars",
                    barWidth: 0,
                    lineWidth: 4,
                    pointSize: 10,
                    fillOpacity: 1
                  },
                  i2: { style: "area", curveType: "function", fillOpacity: 0.3 }
                },
                legend: "none"
              }
            })
          ),
          r.a.createElement(
            i.MDXTag,
            { name: "h1", components: n, props: { id: "data-format" } },
            r.a.createElement(
              i.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h1",
                props: { "aria-hidden": !0, href: "#data-format" }
              },
              r.a.createElement(
                i.MDXTag,
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
          r.a.createElement(
            i.MDXTag,
            { name: "p", components: n },
            r.a.createElement(
              i.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "p",
                props: {
                  href:
                    "https://developers.google.com/chart/interactive/docs/gallery/intervals#data-format"
                }
              },
              "Complete Data Format Reference"
            )
          ),
          r.a.createElement(
            i.MDXTag,
            { name: "h1", components: n, props: { id: "reference" } },
            r.a.createElement(
              i.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "h1",
                props: { "aria-hidden": !0, href: "#reference" }
              },
              r.a.createElement(
                i.MDXTag,
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
          r.a.createElement(
            i.MDXTag,
            { name: "p", components: n },
            r.a.createElement(
              i.MDXTag,
              {
                name: "a",
                components: n,
                parentName: "p",
                props: {
                  href:
                    "https://developers.google.com/chart/interactive/docs/gallery/intervals"
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
