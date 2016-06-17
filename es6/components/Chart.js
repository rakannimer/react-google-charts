'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Promise from 'bluebird';

import DEFAULT_COLORS from '../constants/DEFAULT_CHART_COLORS';
import googleChartLoader from './GoogleChartLoader';

var debug = require('debug')('react-google-charts:Chart');var uniqueID = 0;

var generateUniqueID = function generateUniqueID() {
  uniqueID++;
  return "reactgooglegraph-" + uniqueID;
};

var googleErrorHandler = function googleErrorHandler(id, message) {
  console.error("Google Charts encountered an error : ");
  console.error('Error ID : ' + id);
  console.error('Error MESSAGE : ' + message);
};

var Chart = (function (_React$Component) {
  _inherits(Chart, _React$Component);

  function Chart(props) {
    _classCallCheck(this, Chart);

    if (process.env.NODE_ENV === 'development') {
      localStorage.debug = "react-google-charts:*";
    }
    debug('constructor', props);
    _get(Object.getPrototypeOf(Chart.prototype), 'constructor', this).call(this, props);
    this.state = { graphID: props.graph_id || generateUniqueID() };
    this.chart = null;
    this.wrapper = null;
    this.hidden_columns = {};
    this.dataTable = [];
  }

  _createClass(Chart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      debug('componentDidMount');
      if (this.props.loadCharts) {
        googleChartLoader.init(this.props.chartPackages, this.props.chartVersion).then(function (asd) {
          _this.drawChart();
        });
      } else {
        this.drawChart();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      try {
        google.visualization.events.removeAllListeners(this.wrapper);
      } catch (err) {
        console.error("Error removing events, error : ", err);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this2 = this;

      debug('componentDidUpdate');
      if (!this.props.loadCharts) {
        this.drawChart();
      } else if (googleChartLoader.isLoading) {
        googleChartLoader.initPromise.then(function () {
          _this2.drawChart.bind(_this2)();
        });
      } else if (googleChartLoader.isLoaded) {
        this.drawChart.bind(this)();
      }
    }
  }, {
    key: 'buildDataTableFromProps',
    value: function buildDataTableFromProps() {
      debug('buildDataTableFromProps', this.props);
      if (this.props.data === null && this.props.rows.length === 0) {
        throw new Error("Can't build DataTable from rows and columns: rows array in props is empty");
      } else if (this.props.data === null && this.props.columns.length === 0) {
        throw new Error("Can't build DataTable from rows and columns: columns array in props is empty");
      }
      if (this.props.data !== null) {
        try {
          this.wrapper.setDataTable(this.props.data);
          var _dataTable = this.wrapper.getDataTable();
          return _dataTable;
        } catch (err) {
          console.log('Failed to set DataTable from data props ! ', err);
          throw new Error('Failed to set DataTable from data props ! ', err);
        }
      }

      var dataTable = new google.visualization.DataTable();
      this.props.columns.forEach(function (column) {
        dataTable.addColumn(column);
      });
      dataTable.addRows(this.props.rows);
      return dataTable;
    }
  }, {
    key: 'updateDataTable',
    value: function updateDataTable() {
      debug("updateDataTable");
      google.visualization.errors.removeAll(document.getElementById(this.wrapper.getContainerId()));
      this.dataTable.removeRows(0, this.dataTable.getNumberOfRows());
      this.dataTable.removeColumns(0, this.dataTable.getNumberOfColumns());
      this.dataTable = this.buildDataTableFromProps.bind(this)();
      return this.dataTable;
    }

    //DEPRECATED AND NOT USED
  }, {
    key: 'getDataTableFromProps',
    value: function getDataTableFromProps() {
      debug("getDataTableFromProps");
      return this.props.data !== null ? this.props.data : this.buildDataTableFromProps.bind(this)();
    }
  }, {
    key: 'drawChart',
    value: function drawChart() {
      var _this3 = this;

      debug("drawChart", this);
      if (!this.wrapper) {
        var chartConfig = {
          chartType: this.props.chartType,
          options: this.props.options,
          containerId: this.state.graphID
        };
        this.wrapper = new google.visualization.ChartWrapper(chartConfig);
        this.dataTable = this.buildDataTableFromProps.bind(this)();
        this.wrapper.setDataTable(this.dataTable);

        google.visualization.events.addOneTimeListener(this.wrapper, 'ready', function () {
          _this3.chart = _this3.wrapper.getChart();
          _this3.listenToChartEvents.bind(_this3)();
          _this3.addChartActions.bind(_this3)();
        });
      } else {
        this.updateDataTable.bind(this)();
        this.wrapper.setDataTable(this.dataTable);
        this.wrapper.setChartType(this.props.chartType);
        this.wrapper.setOptions(this.props.options);
      }
      this.wrapper.draw();
    }
  }, {
    key: 'addChartActions',
    value: function addChartActions() {
      debug('addChartActions', this.props.chartActions);
      if (this.props.chartActions === null) {
        return;
      }
      this.chart.setAction({
        id: this.props.chartActions.id,
        text: this.props.chartActions.text,
        action: this.props.chartActions.action.bind(this, this.chart)
      });
    }
  }, {
    key: 'listenToChartEvents',
    value: function listenToChartEvents() {
      var _this4 = this;

      debug('listenToChartEvents', this.props.legend_toggle, this.props.chartEvents);
      if (this.props.legend_toggle) {
        google.visualization.events.addListener(this.wrapper, 'select', this.onSelectToggle.bind(this));
      }
      this.props.chartEvents.forEach(function (chartEvent) {
        if (chartEvent.eventName === 'ready') {
          chartEvent.callback(_this4);
        } else {
          (function (chartEvent) {
            google.visualization.events.addListener(_this4.chart, chartEvent.eventName, function (e) {
              chartEvent.callback(_this4, e);
            });
          })(chartEvent);
        }
      });
    }
  }, {
    key: 'onSelectToggle',
    value: function onSelectToggle() {
      debug('onSelectToggle');
      var selection = this.chart.getSelection();
      if (selection.length > 0) {
        if (selection[0].row == null) {
          var column = selection[0].column;
          this.togglePoints.bind(this)(column);
        }
      }
    }
  }, {
    key: 'getColumnColor',
    value: function getColumnColor(columnIndex) {
      if (this.props.options.colors) {
        if (this.props.options.colors[columnIndex]) {
          return this.props.options.colors[columnIndex];
        }
      } else {
        if (typeof DEFAULT_COLORS[columnIndex] !== undefined) {
          return DEFAULT_COLORS[columnIndex];
        } else {
          return DEFAULT_COLORS[0];
        }
      }
    }
  }, {
    key: 'buildColumnFromSourceData',
    value: function buildColumnFromSourceData(columnIndex) {
      debug('buildColumnFromSourceData', columnIndex);
      return {
        label: this.dataTable.getColumnLabel(columnIndex),
        type: this.dataTable.getColumnType(columnIndex),
        sourceColumn: columnIndex
      };
    }
  }, {
    key: 'buildEmptyColumnFromSourceData',
    value: function buildEmptyColumnFromSourceData(columnIndex) {
      debug('buildEmptyColumnFromSourceData', columnIndex);
      return {
        label: this.dataTable.getColumnLabel(columnIndex),
        type: this.dataTable.getColumnType(columnIndex),
        calc: function calc() {
          return null;
        }
      };
    }
  }, {
    key: 'addEmptyColumnTo',
    value: function addEmptyColumnTo(columns, columnIndex) {
      debug('addEmptyColumnTo', columns, columnIndex);
      var emptyColumn = this.buildEmptyColumnFromSourceData(columnIndex);
      columns.push(emptyColumn);
    }
  }, {
    key: 'hideColumn',
    value: function hideColumn(colors, columnIndex) {
      debug('hideColumn', colors, columnIndex);
      if (!this.isHidden(columnIndex)) {
        this.hidden_columns[columnIndex] = { color: this.getColumnColor(columnIndex - 1) };
      }
      colors.push('#CCCCCC');
    }
  }, {
    key: 'addSourceColumnTo',
    value: function addSourceColumnTo(columns, columnIndex) {
      debug('addSourceColumnTo', columns, columnIndex);
      var sourceColumn = this.buildColumnFromSourceData(columnIndex);
      columns.push(sourceColumn);
    }
  }, {
    key: 'isHidden',
    value: function isHidden(columnIndex) {
      return this.hidden_columns[columnIndex] !== undefined;
    }
  }, {
    key: 'restoreColorTo',
    value: function restoreColorTo(colors, columnIndex) {
      debug('restoreColorTo', colors, columnIndex);
      debug('hidden_columns', this.hidden_columns);
      var previousColor = undefined;
      if (this.isHidden(columnIndex)) {
        previousColor = this.hidden_columns[columnIndex].color;
        delete this.hidden_columns[columnIndex];
      } else {
        previousColor = this.getColumnColor(columnIndex - 1);
      }
      if (columnIndex !== 0) {
        colors.push(previousColor);
      }
    }
  }, {
    key: 'togglePoints',
    value: function togglePoints(column) {
      debug('togglePoints', column);
      var view = new google.visualization.DataView(this.wrapper.getDataTable());
      var columnCount = view.getNumberOfColumns();
      var colors = [];
      var columns = [];
      for (var i = 0; i < columnCount; i++) {
        // If user clicked on legend
        if (i === 0) {
          this.addSourceColumnTo.bind(this)(columns, i);
        } else if (i === column) {
          if (this.isHidden(i)) {
            this.addSourceColumnTo.bind(this)(columns, i);
            this.restoreColorTo.bind(this)(colors, i);
          } else {
            this.addEmptyColumnTo.bind(this)(columns, i);
            this.hideColumn.bind(this)(colors, i);
          }
        } else {
          if (this.isHidden(i)) {
            this.addEmptyColumnTo.bind(this)(columns, i);
            this.hideColumn.bind(this)(colors, i);
          } else {
            this.addSourceColumnTo.bind(this)(columns, i);
            this.restoreColorTo.bind(this)(colors, i);
          }
        }
      }
      view.setColumns(columns);
      this.props.options.colors = colors;
      this.chart.draw(view, this.props.options);
    }
  }, {
    key: 'render',
    value: function render() {
      debug('render', this.props, this.state);
      var divStyle = { height: this.props.height || this.props.options.height, width: this.props.width || this.props.options.width };
      return React.createElement(
        'div',
        { id: this.state.graphID, style: divStyle },
        ' Rendering Chart... '
      );
    }
  }]);

  return Chart;
})(React.Component);

export default Chart;;

Chart.defaultProps = {
  chartType: 'LineChart',
  rows: [],
  columns: [],
  options: {
    chart: {
      title: 'Chart Title',
      subtitle: 'Subtitle'
    },
    hAxis: { title: 'X Label' },
    vAxis: { title: 'Y Label' },
    width: '400px',
    height: '300px'
  },
  width: '400px',
  height: '300px',
  chartEvents: [],
  chartActions: null,
  data: null,
  onSelect: null,
  legend_toggle: false,
  loadCharts: true
};