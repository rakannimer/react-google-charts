import React from "react";
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client";

function formatPathToTitle(path) {
  // Step 1: Remove the "/examples/" part of the path
  let formatted = path.replace(/.*\//, "");

  // Step 2: Replace hyphens with spaces
  formatted = formatted.replace(/-/g, " ");

  // Step 3: Capitalize the first letter of each word
  formatted = formatted.replace(/\b\w/g, (char) => char.toUpperCase());
  formatted = formatted.replace(/Advanced /g, "");

  return formatted;
}
export default function DocList() {
  const allDocsData = useAllDocsData();

  const docs = allDocsData.default.versions[0].docs;

  return (
    <div>
      <ul>
        {docs
          ?.filter((el) => Boolean(el.path))
          .filter((el) => el.path !== "/examples/" && el.path !== "/")
          .map((doc) => (
            <li key={doc.id}>
              <a href={doc.path}>{formatPathToTitle(doc.path) || doc.path}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}
