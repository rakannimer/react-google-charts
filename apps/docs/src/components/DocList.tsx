import React, { useState } from "react";
import { docs } from "../../docs/examples/docs";
import sortBy from "lodash/sortBy";

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
  const [searchTerm, setSearchTerm] = useState("");
  const docsWithTitle = sortBy(
    docs.map((doc) => ({
      ...doc,
      title: formatPathToTitle(doc.url),
    })),
    "frontMatter.sidebar_position",
  );
  const filteredDocs = docsWithTitle.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="library-page">
      <header className="library-header">
        <input
          type="text"
          placeholder="Find component"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </header>
      <ul className="library">
        {filteredDocs
          ?.filter((el) => Boolean(el.url))
          .filter(
            (el) =>
              el.url !== "/examples/" &&
              !el.url.includes("/index") &&
              !el.url.includes("walkthrough") &&
              !el.url.includes("sponsor"),
          )
          .map((doc) => {
            const name = doc.url.split("/").pop();
            const { App } = require(
              `../../../../sandboxes/${name}/default/App`,
            );
            return (
              <div className="chart-card" role="listitem" key={doc.url}>
                <div className="chart-card-chart-container">
                  <App />
                </div>
                <a href={doc.url} className="chart-card-cta">
                  <h4>{doc.title}</h4>
                </a>
              </div>
            );
          })}
      </ul>
    </div>
  );
}
