# React Google Charts

<img align="right" alt="Logo" src="../../apps/docs/static/img/logo-v2.svg">

React Google Charts is a lightweight and fully typed React wrapper for [Google Charts](https://developers.google.com/chart/interactive/docs/reference).

It's easy to use, supports over 25 chart types, supports animations and is highly customizable when needed.

[![version](https://img.shields.io/npm/v/react-google-charts.svg)](https://www.npmjs.com/package/react-google-charts)
[![downloads](https://img.shields.io/npm/dm/react-google-charts.svg)](https://www.npmjs.com/package/react-google-charts)
[![license](https://shields.io/badge/license-MIT-green)](http://opensource.org/licenses/MIT)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-google-charts.svg)](https://bundlephobia.com/result?p=react-google-charts)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC)

<br />
<a href="https://www.react-google-charts.com/">Docs</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://www.react-google-charts.com/docs/quick-walkthrough">Quickstart</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://www.react-google-charts.com/examples">Examples</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#contributing">Contributing</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://stackoverflow.com/questions/tagged/react-google-charts">Stack Overflow</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://discord.gg/nNa2EEgUkS">Discord</a>
<br />
<hr />

[![Visit Our Website](https://img.shields.io/badge/Visit-Website-green?style=for-the-badge)](https://react-google-charts.com)

## Quickstart

Install this library with your favorite package manager:

```bash
npm i react-google-charts
```

Then, import and use it:

```jsx
import { Chart } from "react-google-charts";

<Chart
  chartType="ScatterChart"
  data={[
    ["Age", "Weight"],
    [4, 5.5],
    [8, 12],
  ]}
  width="100%"
  height="400px"
  legendToggle
/>;
```

## Contributing

Contributions are very welcome. Check out [CONTRIBUTING.md](CONTRIBUTING.md)

## Run the Storybook

```bash
git clone https://www.github.com/rakannimer/react-google-charts
cd react-google-charts
npm i
npm run start:storybook
```
