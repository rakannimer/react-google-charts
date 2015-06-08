function build_circle_scatter() {
  //var dataTable = new google.visualization.DataTable();
  var columns = [{
    type: 'number',
    label:''
  },
  {
    type: 'number',
    label:''
  }
  ];
  var rows = [];
  var radius = 100;
  for (var i = 0; i < 6.28; i += 0.1) {
    rows.push([radius * Math.cos(i), radius * Math.sin(i)]);
  } 
  rows.push([0, 0]);

  return {rows: rows, columns: columns};
}
 
var circle_scatter_data = build_circle_scatter();
var ScatterCharts =  {
    two_columns : {
       dataArray : [
           ['Age', 'Weight'],
            [ 8,      12],
            [ 4,      5.5],
            [ 11,     14],
            [ 4,      5],
            [ 3,      3.5],
            [ 6.5,    7]
        ],
        options : {
          title: 'Age vs. Weight comparison',
            hAxis: {title: 'Age', minValue: 0, maxValue: 15},
            vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
            legend: 'none'
        }
    },
    circle_scatter: {
      rows : circle_scatter_data.rows,
      columns : circle_scatter_data.columns,
      options: {
        legend: 'none',
        colors: ['#087037'],
        pointShape: 'star',
        pointSize: 18,
        animation: {
          duration: 200,
          easing: 'inAndOut',
        }
      }
    }


};




module.exports = ScatterCharts;