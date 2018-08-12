/// <reference types="Cypress" />

const isGoogleChart = divID => {
  // cy.wait(500);

  cy.get(divID, { timeout: 8000 })
    .find("svg")
    .should("have.length.greaterThan", 0);
};

const BASE_URL = `http://localhost:5000`;

const times = num => {
  return Array.from({ length: num }, (undef, i) => i);
};

context("React Google Charts", () => {
  describe("Charts", () => {
    it("Area Chart", () => {
      cy.visit(`${BASE_URL}/area-chart`);
      times(3).forEach(i => {
        cy.get("body")
          .find(`[data-testid=${i + 1}]`)
          .find("svg")
          .should("have.length", 1);
      });
    });
    it("Bar Chart", () => {
      cy.visit(`${BASE_URL}/bar-chart`);
      times(6).forEach(i => {
        cy.get("body")
          .find(`[data-testid=${i + 1}]`)
          .find("svg")
          .should("have.length", 1);
      });
    });
    it("Bubble Chart", () => {
      cy.visit(`${BASE_URL}/bubble-chart`);
      times(3).forEach(i => {
        cy.get("body")
          .find(`[data-testid=${i + 1}]`)
          .find("svg")
          .should("have.length", 1);
      });
    });
    it("Calendar Chart", () => {
      cy.visit(`${BASE_URL}/calendar-chart`);
      times(2).forEach(i => {
        cy.get("body")
          .find(`[data-testid=${i + 1}]`)
          .find("svg")
          .should("have.length", 1);
      });
    });
    it("Candlestick Chart", () => {
      cy.visit(`${BASE_URL}/candlestick-chart`);
      times(2).forEach(i => {
        cy.get("body")
          .find(`[data-testid=${i + 1}]`)
          .find("svg")
          .should("have.length", 1);
      });
    });
    it("Combo Chart", () => {
      cy.visit(`${BASE_URL}/combo-chart`);
      times(1).forEach(i => {
        cy.get("body")
          .find(`[data-testid=${i + 1}]`)
          .find("svg")
          .should("have.length", 1);
      });
    });
    it("Diff Chart", () => {
      cy.visit(`${BASE_URL}/diff-chart`);
      isGoogleChart("[data-testid=1]");
      isGoogleChart("[data-testid=2]");
      isGoogleChart("[data-testid=3]");
      isGoogleChart("[data-testid=4]");
    });
    it("Formatters", () => {
      cy.visit(`${BASE_URL}/formatters`);
      // isGoogleChart("#reactgooglegraph-1");
      cy.get("[data-testid=1]")
        .find(".google-visualization-formatters-arrow-dr")
        .should("have.length.greaterThan", 1);
      cy.get("[data-testid=2]")
        .find(".google-visualization-formatters-bars")
        .should("have.length.greaterThan", 1);
      cy.get("[data-testid=3]")
        .find(".google-visualization-table-type-number")
        .should("have.length.greaterThan", 1);

      cy.get("[data-testid=4]")
        .find(".google-visualization-table-type-date")
        .should("have.length.greaterThan", 1);
    });

    it("From API", () => {
      cy.visit(`${BASE_URL}/data-sources/from-api`);
      cy.get("[data-testid=1]", { timeout: 18000 })
        .find("svg", { timeout: 18000 })
        .should("have.length.greaterThan", 0);
      cy.visit(
        `${BASE_URL}/data-sources/from-api#debt-incurred-by-the-lebanese-state-over-time`
      );
      cy.get("[data-testid=2]", { timeout: 20000 })
        .find("svg", { timeout: 20000 })
        .should("have.length.greaterThan", 0);
    });

    it("From Spreadsheet", () => {
      cy.visit(`${BASE_URL}/data-sources/from-google-spreadsheet`);
      isGoogleChart("[data-testid=1]");
      isGoogleChart("[data-testid=2]");
    });

    it("Gantt Chart", () => {
      cy.visit(`${BASE_URL}/gantt-chart`);
      isGoogleChart("[data-testid=1]");
      isGoogleChart("[data-testid=2]");
      isGoogleChart("[data-testid=3]");
      isGoogleChart("[data-testid=4]");
      isGoogleChart("[data-testid=5]");
      isGoogleChart("[data-testid=6]");
      isGoogleChart("[data-testid=7]");
    });

    it("Gauge Chart", () => {
      cy.visit(`${BASE_URL}/gauge-chart`);
      cy.get("[data-testid=1]")
        .find("svg")
        .should("have.length", 3);
    });

    it("Geo Chart", () => {
      cy.visit(`${BASE_URL}/geo-chart`);
      times(4).forEach(i => {
        cy.get("body")
          .find(`[data-testid=${i + 1}]`)
          .find("svg")
          .should("have.length", 1);
      });
    });
    it("Histogram Chart", () => {
      cy.visit(`${BASE_URL}/histogram-chart`);
      isGoogleChart("[data-testid=1]");
      isGoogleChart("[data-testid=2]");
      isGoogleChart("[data-testid=3]");
      isGoogleChart("[data-testid=4]");
      isGoogleChart("[data-testid=5]");
    });
    it("Intervals Chart", () => {
      cy.visit(`${BASE_URL}/intervals-chart`);
      isGoogleChart("[data-testid=1]");
      isGoogleChart("[data-testid=2]");
      isGoogleChart("[data-testid=3]");
      isGoogleChart("[data-testid=4]");
      isGoogleChart("[data-testid=5]");
      isGoogleChart("[data-testid=6]");
      isGoogleChart("[data-testid=7]");
      isGoogleChart("[data-testid=8]");
    });
    it("Line Chart", () => {
      cy.visit(`${BASE_URL}/line-chart`);
      isGoogleChart("[data-testid=1]");
      isGoogleChart("[data-testid=2]");
      isGoogleChart("[data-testid=3]");
      isGoogleChart("[data-testid=4]");
    });
    it("Org Chart", () => {
      cy.visit(`${BASE_URL}/org-chart`);
      cy.get("[data-testid=1]")
        .find(".google-visualization-orgchart-table")
        .should("have.length", 1);
    });
    it("Pie Chart", () => {
      cy.visit(`${BASE_URL}/pie-chart`);
      isGoogleChart("[data-testid=1]");
      isGoogleChart("[data-testid=2]");
      isGoogleChart("[data-testid=3]");
      isGoogleChart("[data-testid=4]");
      isGoogleChart("[data-testid=5]");
      isGoogleChart("[data-testid=6]");
      isGoogleChart("[data-testid=7]");
    });
    it("Sankey Diagram", () => {
      cy.visit(`${BASE_URL}/sankey-diagram`);
      isGoogleChart("[data-testid=1]");
      isGoogleChart("[data-testid=2]");
      isGoogleChart("[data-testid=3]");
    });
    it("Scatter Chart", () => {
      cy.visit(`${BASE_URL}/scatter-chart`);
      isGoogleChart("[data-testid=1]");
      isGoogleChart("[data-testid=2]");
      isGoogleChart("[data-testid=3]");
      isGoogleChart("[data-testid=4]");
      isGoogleChart("[data-testid=5]");
    });
    it("Stepped Area Chart", () => {
      cy.visit(`${BASE_URL}/stepped-area-chart`);
      isGoogleChart("[data-testid=1]");
      isGoogleChart("[data-testid=2]");
    });
    it("Table Chart", () => {
      cy.visit(`${BASE_URL}/table-chart`);
      cy.get("[data-testid=1]")
        .find(".google-visualization-table")
        .should("have.length", 1);
    });
    it("Timelines", () => {
      cy.visit(`${BASE_URL}/timeline-chart`);
      isGoogleChart("[data-testid=1]");
      isGoogleChart("[data-testid=2]");
      isGoogleChart("[data-testid=3]");
      isGoogleChart("[data-testid=4]");
      isGoogleChart("[data-testid=5]");
      isGoogleChart("[data-testid=6]");
      isGoogleChart("[data-testid=7]");
    });
    it("TreeMap Chart", () => {
      cy.visit(`${BASE_URL}/treemap-chart`);
      isGoogleChart("[data-testid=1]");
      isGoogleChart("[data-testid=2]");
      isGoogleChart("[data-testid=3]");
    });
    it("WordTree Chart", () => {
      cy.visit(`${BASE_URL}/wordtree-chart`);
      isGoogleChart("[data-testid=1]");
      isGoogleChart("[data-testid=2]");
    });
  });
});
