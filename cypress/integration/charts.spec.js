/// <reference types="Cypress" />

const isGoogleChart = divID => {
  cy.get(divID)
    .find("svg")
    .should("have.length", 1);
};

const BASE_URL = `http://localhost:3000`;
context("React Google Charts", () => {
  describe("Charts", () => {
    it("Area Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/area-chart`);
      isGoogleChart("#reactgooglegraph-1");
      isGoogleChart("#reactgooglegraph-2");
      isGoogleChart("#reactgooglegraph-3");
    });
    it("Bar Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/bar-chart`);
      isGoogleChart("#reactgooglegraph-1");
      isGoogleChart("#reactgooglegraph-2");
      isGoogleChart("#reactgooglegraph-3");
      isGoogleChart("#reactgooglegraph-4");
      isGoogleChart("#reactgooglegraph-5");
      isGoogleChart("#reactgooglegraph-6");
    });
    it("Bubble Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/bubble-chart`);
      isGoogleChart("#reactgooglegraph-1");
      isGoogleChart("#reactgooglegraph-2");
      isGoogleChart("#reactgooglegraph-3");
    });
    it("Calendar Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/calendar-chart`);
      isGoogleChart("#reactgooglegraph-1");
      isGoogleChart("#reactgooglegraph-2");
    });
    it("Candlestick Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/candlestick-chart`);
      isGoogleChart("#reactgooglegraph-1");
      isGoogleChart("#reactgooglegraph-2");
    });
    it("Combo Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/combo-chart`);
      isGoogleChart("#reactgooglegraph-1");
    });
    it("Diff Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/diff-chart`);
      isGoogleChart("#reactgooglegraph-1");
      isGoogleChart("#reactgooglegraph-2");
      isGoogleChart("#reactgooglegraph-3");
      isGoogleChart("#reactgooglegraph-4");
    });
    it("Formatters", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/formatters`);
      // isGoogleChart("#reactgooglegraph-1");
      cy.get("#reactgooglegraph-1")
        .find(".google-visualization-formatters-arrow-dr")
        .should("have.length.greaterThan", 1);
      cy.get("#reactgooglegraph-2")
        .find(".google-visualization-formatters-bars")
        .should("have.length.greaterThan", 1);
      cy.get("#reactgooglegraph-3")
        .find(".google-visualization-table-type-number")
        .should("have.length.greaterThan", 1);

      cy.get("#reactgooglegraph-4")
        .find(".google-visualization-table-type-date")
        .should("have.length.greaterThan", 1);
    });
    it("Gantt Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/gantt-chart`);
      isGoogleChart("#reactgooglegraph-1");
      isGoogleChart("#reactgooglegraph-2");
      isGoogleChart("#reactgooglegraph-3");
      isGoogleChart("#reactgooglegraph-4");
      isGoogleChart("#reactgooglegraph-5");
      isGoogleChart("#reactgooglegraph-6");
      isGoogleChart("#reactgooglegraph-7");
    });

    it("Gauge Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/gauge-chart`);
      cy.get("#reactgooglegraph-1")
        .find("svg")
        .should("have.length", 3);
    });
    it("Geo Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/geo-chart`);
      isGoogleChart("#reactgooglegraph-1");
      // isGoogleChart("#reactgooglegraph-2");
      // isGoogleChart("#reactgooglegraph-3");
      isGoogleChart("#reactgooglegraph-4");
    });
    it("Histogram Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/histogram-chart`);
      isGoogleChart("#reactgooglegraph-1");
      isGoogleChart("#reactgooglegraph-2");
      isGoogleChart("#reactgooglegraph-3");
      isGoogleChart("#reactgooglegraph-4");
      isGoogleChart("#reactgooglegraph-5");
    });
    it("Intervals Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/intervals-chart`);
      isGoogleChart("#reactgooglegraph-1");
      isGoogleChart("#reactgooglegraph-2");
      isGoogleChart("#reactgooglegraph-3");
      isGoogleChart("#reactgooglegraph-4");
      isGoogleChart("#reactgooglegraph-5");
      isGoogleChart("#reactgooglegraph-6");
      isGoogleChart("#reactgooglegraph-7");
      isGoogleChart("#reactgooglegraph-8");
    });
    it("Line Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/line-chart`);
      isGoogleChart("#reactgooglegraph-1");
      isGoogleChart("#reactgooglegraph-2");
      isGoogleChart("#reactgooglegraph-3");
      isGoogleChart("#reactgooglegraph-4");
    });
    it("Org Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/org-chart`);
      cy.get("#reactgooglegraph-1")
        .find(".google-visualization-orgchart-table")
        .should("have.length", 1);
    });
    it("Pie Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/pie-chart`);
      isGoogleChart("#reactgooglegraph-1");
      isGoogleChart("#reactgooglegraph-2");
      isGoogleChart("#reactgooglegraph-3");
      isGoogleChart("#reactgooglegraph-4");
      isGoogleChart("#reactgooglegraph-5");
      isGoogleChart("#reactgooglegraph-6");
      isGoogleChart("#reactgooglegraph-7");
    });
    it("Sankey Diagram", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/sankey-diagram`);
      isGoogleChart("#reactgooglegraph-1");
      isGoogleChart("#reactgooglegraph-2");
      isGoogleChart("#reactgooglegraph-3");
    });
    it("Scatter Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/scatter-chart`);
      isGoogleChart("#reactgooglegraph-1");
      isGoogleChart("#reactgooglegraph-2");
      isGoogleChart("#reactgooglegraph-3");
      isGoogleChart("#reactgooglegraph-4");
      isGoogleChart("#reactgooglegraph-5");
    });
    it("Stepped Area Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/stepped-area-chart`);
      isGoogleChart("#reactgooglegraph-1");
      isGoogleChart("#reactgooglegraph-2");
    });
    it("Table Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/table-chart`);
      cy.get("#reactgooglegraph-1")
        .find(".google-visualization-table")
        .should("have.length", 1);
    });
    it("Timelines", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/timeline-chart`);
      isGoogleChart("#reactgooglegraph-1");
      isGoogleChart("#reactgooglegraph-2");
      isGoogleChart("#reactgooglegraph-3");
      isGoogleChart("#reactgooglegraph-4");
      isGoogleChart("#reactgooglegraph-5");
      isGoogleChart("#reactgooglegraph-6");
      isGoogleChart("#reactgooglegraph-7");
    });
    it("TreeMap Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/treemap-chart`);
      isGoogleChart("#reactgooglegraph-1");
      isGoogleChart("#reactgooglegraph-2");
      isGoogleChart("#reactgooglegraph-3");
    });
    it("WordTree Chart", () => {
      cy.visit(`${BASE_URL}/#/react-google-charts/wordtree-chart`);
      isGoogleChart("#reactgooglegraph-1");
      isGoogleChart("#reactgooglegraph-2");
    });
  });
});
