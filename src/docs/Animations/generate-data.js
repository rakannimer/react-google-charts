const rand = n => {
  return Math.random() * 8 * n;
};
export const generateData = () => {
  return [
    ["Age", "Weight"],
    [rand(8), rand(12)],
    [rand(4), rand(5.5)],
    [rand(1), rand(14)],
    [rand(4), rand(5)],
    [rand(3), rand(3.5)],
    [rand(6), rand(7)],
    [rand(8), rand(12)],
    [rand(4), rand(5.5)],
    [rand(1), rand(14)],
    [rand(4), rand(5)],
    [rand(3), rand(3.5)],
    [rand(6), rand(7)],
    [rand(4), rand(5.5)],
    [rand(1), rand(14)],
    [rand(4), rand(5)],
    [rand(3), rand(3.5)],
    [rand(6), rand(7)]
  ];
};

google.charts.load("current", {
  packages: ["corechart", "table", "gauge", "controls"]
});
google.charts.setOnLoadCallback(drawStringFilter);

function drawStringFilter() {
  var dashboard = new google.visualization.Dashboard(
    document.getElementById("stringFilter_dashboard_div")
  );
  var control = new google.visualization.ControlWrapper({
    controlType: "StringFilter",
    containerId: "stringFilter_control_div",
    options: {
      filterColumnIndex: 0
    }
  });
  var chart = new google.visualization.ChartWrapper({
    chartType: "Table",
    containerId: "stringFilter_chart_div",
    options: { height: "100%", width: "100%" }
  });
  var data = google.visualization.arrayToDataTable([
    ["Name", "Age"],
    ["Michael", 12],
    ["Elisa", 20],
    ["Robert", 7],
    ["John", 54],
    ["Jessica", 22],
    ["Aaron", 3],
    ["Margareth", 42],
    ["Miranda", 33]
  ]);
  dashboard.bind(control, chart);
  dashboard.draw(data);
}
