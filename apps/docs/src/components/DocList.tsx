import React, { useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const docsWithTitle = docs.map((doc) => ({
    ...doc,
    title: formatPathToTitle(doc.path),
  }));
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
          ?.filter((el) => Boolean(el.path))
          .filter((el) => el.path !== "/examples/" && el.path !== "/")
          .map((doc) => (
            <a href={doc.path} className="chart-card" role="listitem">
              <h4>{doc.title}</h4>
            </a>
          ))}
      </ul>
    </div>
  );
}
