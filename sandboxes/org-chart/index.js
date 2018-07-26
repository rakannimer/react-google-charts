import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Chart
          chartType="OrgChart"
          data={[
            [
              {
                v: "Mike",
                f:
                  'Mike<div style="color:red; font-style:italic">President</div>'
              },
              "",
              "The President"
            ],
            [
              {
                v: "Jim",
                f:
                  'Jim<div style="color:red; font-style:italic">Vice President</div>'
              },
              "Mike",
              "VP"
            ],
            ["Alice", "Mike", ""],
            ["Bob", "Jim", "Bob Sponge"],
            ["Carol", "Bob", ""]
          ]}
          options={{
            allowHtml: true
          }}
          width="100%"
          height="400px"
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
