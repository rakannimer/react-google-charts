const path = require("path");
const fs = require("fs");

function humanize(str) {
  return str
    .replace("advanced-", "")
    .split("-")
    .map((_) => _.replace(_[0], _[0].toUpperCase()))
    .join(" ");
}

function getSandboxData(sandboxType) {
  const sandboxTypePath = path.join("sandboxes", sandboxType);
  const sandboxTypeSandboxes = fs
    .readdirSync(sandboxTypePath)
    .filter((_) => !_.includes("."));
  const index = sandboxTypeSandboxes.reduce((index, sandboxTypeSandbox) => {
    const sandboxTypeSandboxPath = path.join(
      sandboxTypePath,
      sandboxTypeSandbox
    );
    const pkgPath = path.join(sandboxTypeSandboxPath, "package.json");
    const { description: name } = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    const sandboxInfo = { id: sandboxTypeSandbox, name };

    if (sandboxTypeSandbox === "default") {
      index.unshift(sandboxInfo);
    } else {
      index.push(sandboxInfo);
    }

    return index;
  }, []);
  let meta = {};

  try {
    const metaPath = path.resolve(sandboxTypePath, "meta.js");

    meta = require(metaPath);
  } catch (err) {}

  return { type: sandboxType, name: humanize(sandboxType), index, meta };
}

function getSandboxesData() {
  const sandboxTypes = fs
    .readdirSync("sandboxes")
    .filter((_) => !_.includes("."));
  const [basic, advanced] = sandboxTypes.reduce(
    (sandboxesData, sandboxType) => {
      const data = getSandboxData(sandboxType);

      if (data.type.includes("advanced")) {
        sandboxesData[1].push(data);
      } else {
        sandboxesData[0].push(data);
      }

      return sandboxesData;
    },
    [[], []]
  );
  const sandboxesData = [...basic, ...advanced];

  return sandboxesData;
}

function sandboxTemplate(sandboxTypeData, sandboxData) {
  return `## ${sandboxData.name}

<ContextProvider>
  {({ branch, theme }) => (
    <iframe
      src={\`https://codesandbox.io/embed/github/RakanNimer/react-google-charts/tree/\${branch}/sandboxes/${sandboxTypeData.type}/${sandboxData.id}?fontsize=14&hidenavigation=1&module=%2FApp.tsx&theme=\${theme}\`}
      style={{
        width: '100%',
        height: '500px',
        border: 0,
        borderRadius: '4px',
        overflow: 'hidden',
      }}
      title='RakanNimer/react-google-charts: ${sandboxTypeData.name} ${sandboxData.name}'
      allow='accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking'
      sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'
      loading='lazy'
    ></iframe>
  )}
</ContextProvider>
`;
}

function exampleReadMoreTemplate(sandboxTypeData) {
  const entries = Object.entries(sandboxTypeData.meta);

  if (!entries.length) {
    return "";
  }

  return `## Read More

${entries.map(([name, link]) => `- [${name}](${link})`).join("\n")}
`;
}

function exampleTemplate(sandboxTypeData) {
  const readMore = exampleReadMoreTemplate(sandboxTypeData);

  return `---
description: Example of ${sandboxTypeData.name.toLowerCase()} in react-google-charts.
tags:
  - ${sandboxTypeData.name}
---

import ContextProvider from '../../src/components/ContextProvider';

# ${sandboxTypeData.name}

${sandboxTypeData.index
  .map((sandboxData) => sandboxTemplate(sandboxTypeData, sandboxData))
  .join("\n")}${readMore ? `\n${readMore}` : ""}`;
}

function docsModuleTemplate(sandboxTypeData) {
  return `exports.docs = ${JSON.stringify(
    sandboxTypeData.map(({ name, type }) => ({
      title: name,
      slug: `/examples/${type}`,
    })),
    null,
    "  "
  )}
`;
}

const examplesDir = path.join("website", "docs", "examples");
const sandboxesData = getSandboxesData();

fs.writeFileSync(
  path.join(examplesDir, "docs.js"),
  docsModuleTemplate(sandboxesData)
);

sandboxesData.forEach((sandboxTypeData) => {
  const examplePath = path.join(examplesDir, `${sandboxTypeData.type}.mdx`);

  console.log(sandboxTypeData);

  fs.writeFileSync(examplePath, exampleTemplate(sandboxTypeData));
});
