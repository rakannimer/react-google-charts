'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _DEFAULT_CHART_COLORS = require('../constants/DEFAULT_CHART_COLORS');

var _DEFAULT_CHART_COLORS2 = _interopRequireDefault(_DEFAULT_CHART_COLORS);

var _GoogleChartLoader = require('./GoogleChartLoader');

var _GoogleChartLoader2 = _interopRequireDefault(_GoogleChartLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/forbid-prop-types: "off" */


var debug = new _debug2.default('react-google-charts:Chart');

var uniqueID = 0;

var generateUniqueID = function generateUniqueID() {
  uniqueID += 1;
  return 'reactgooglegraph-' + uniqueID;
};

var Chart = function (_React$Component) {
  _inherits(Chart, _React$Component);

  function Chart(props) {
    _classCallCheck(this, Chart);

    debug('constructor', props);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = { graphID: props.graph_id || generateUniqueID() };
    _this.chart = null;
    _this.wrapper = null;
    _this.hidden_columns = {};
    _this.dataTable = [];

    _this.debounce = _this.debounce.bind(_this);
    _this.onResize = _this.onResize.bind(_this);
    _this.drawChart = _this.drawChart.bind(_this);
    _this.togglePoints = _this.togglePoints.bind(_this);
    _this.buildDataTableFromProps = _this.buildDataTableFromProps.bind(_this);
    _this.listenToChartEvents = _this.listenToChartEvents.bind(_this);
    _this.addChartActions = _this.addChartActions.bind(_this);
    _this.updateDataTable = _this.updateDataTable.bind(_this);
    _this.onSelectToggle = _this.onSelectToggle.bind(_this);
    _this.addSourceColumnTo = _this.addSourceColumnTo.bind(_this);
    _this.restoreColorTo = _this.restoreColorTo.bind(_this);
    _this.hideColumn = _this.hideColumn.bind(_this);
    return _this;
  }

  Chart.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    debug('componentDidMount');
    if (typeof window === 'undefined') {
      return;
    }
    if (this.props.loadCharts) {
      _GoogleChartLoader2.default.init(this.props.chartPackages, this.props.chartVersion, this.props.chartLanguage).then(function () {
        _this2.drawChart();
      });
      this.onResize = this.debounce(this.onResize, 200);
      window.addEventListener('resize', this.onResize);
    } else {
      this.drawChart();
    }
  };

  Chart.prototype.componentDidUpdate = function componentDidUpdate() {
    var _this3 = this;

    debug('componentDidUpdate');
    if (!this.props.loadCharts) {
      this.drawChart();
    } else if (_GoogleChartLoader2.default.isLoading) {
      _GoogleChartLoader2.default.initPromise.then(function () {
        _this3.drawChart();
      });
    } else if (_GoogleChartLoader2.default.isLoaded) {
      this.drawChart();
    }
  };

  Chart.prototype.componentWillUnmount = function componentWillUnmount() {
    this.isUnmounted = true;
    try {
      if (window) {
        if (window.google && window.google.visualization) {
          window.google.visualization.events.removeAllListeners(this.wrapper);
        }
        window.removeEventListener('resize', this.onResize);
      }
    } catch (err) {
      return;
    }
  };

  Chart.prototype.onResize = function onResize() {
    debug('Chart::onResize');
    this.drawChart();
  };

  Chart.prototype.onSelectToggle = function onSelectToggle() {
    debug('onSelectToggle');
    var selection = this.chart.getSelection();
    if (selection.length > 0) {
      if (selection[0].row == null) {
        var column = selection[0].column;
        this.togglePoints(column);
      }
    }
  };

  Chart.prototype.getColumnColor = function getColumnColor(columnIndex) {
    if (this.props.options.colors) {
      if (this.props.options.colors[columnIndex]) {
        return this.props.options.colors[columnIndex];
      }
    } else if (columnIndex in _DEFAULT_CHART_COLORS2.default) {
      return _DEFAULT_CHART_COLORS2.default[columnIndex];
    }
    return _DEFAULT_CHART_COLORS2.default[0];
  };

  Chart.prototype.buildDataTableFromProps = function buildDataTableFromProps() {
    debug('buildDataTableFromProps', this.props);

    if (this.props.diffdata) {
      var diffdata = this.props.diffdata;
      var oldData = window.google.visualization.arrayToDataTable(diffdata.old);
      var newData = window.google.visualization.arrayToDataTable(diffdata.new);
      // must take computeDiff from prototypes since not available with charts early in process
      var computeDiff = window.google.visualization[this.props.chartType].prototype.computeDiff;
      var chartDiff = computeDiff(oldData, newData);
      return chartDiff;
    }

    if (this.props.data === null && this.props.rows.length === 0 && !this.props.allowEmptyRows) {
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
        // console.error('Failed to set DataTable from data props ! ', err);
        throw new Error('Failed to set DataTable from data props ! ', err);
      }
    }

    var dataTable = new window.google.visualization.DataTable();
    this.props.columns.forEach(function (column) {
      dataTable.addColumn(column);
    });
    dataTable.addRows(this.props.rows);

    if (this.props.onBuildTable && typeof this.props.onBuildTable === 'function') {
      this.props.onBuildTable.call(this, dataTable);
    }

    var applyNumberFormat = function applyNumberFormat(column, options) {
      var formatter = new window.google.visualization.NumberFormat(options);
      formatter.format(dataTable, column);
    };

    var applyDateFormat = function applyDateFormat(column, options) {
      var formatter = new window.google.visualization.DateFormat(options);
      formatter.format(dataTable, column);
    };

    if (this.props.numberFormat) {
      var _props$numberFormat = this.props.numberFormat,
          column = _props$numberFormat.column,
          options = _props$numberFormat.options;

      applyNumberFormat(column, options);
    }

    if (this.props.dateFormat) {
      var _props$dateFormat = this.props.dateFormat,
          columns = _props$dateFormat.columns,
          _options = _props$dateFormat.options;

      columns.forEach(function (col) {
        applyDateFormat(col, _options);
      });
    }

    this.props.formatters.forEach(function (_ref) {
      var type = _ref.type,
          column = _ref.column,
          options = _ref.options;

      switch (type) {
        case 'NumberFormat':
          applyNumberFormat(column, options);
          break;
        case 'DateFormat':
          applyDateFormat(column, options);
          break;
        default:
          console.log('Unkown formatter type: ' + type);
          break;
      }
    });

    return dataTable;
  };

  Chart.prototype.updateDataTable = function updateDataTable() {
    debug('updateDataTable');
    window.google.visualization.errors.removeAll(document.getElementById(this.wrapper.getContainerId()));
    this.dataTable.removeRows(0, this.dataTable.getNumberOfRows());
    this.dataTable.removeColumns(0, this.dataTable.getNumberOfColumns());
    this.dataTable = this.buildDataTableFromProps();
    return this.dataTable;
  };

  Chart.prototype.drawChart = function drawChart() {
    var _this4 = this;

    debug('drawChart', this);

    if (this.isUnmounted) {
      return;
    }

    if (!this.wrapper) {
      var chartConfig = {
        chartType: this.props.chartType,
        options: this.props.options,
        containerId: this.state.graphID
      };
      this.wrapper = new window.google.visualization.ChartWrapper(chartConfig);
      this.dataTable = this.buildDataTableFromProps();
      this.wrapper.setDataTable(this.dataTable);

      window.google.visualization.events.addOneTimeListener(this.wrapper, 'ready', function () {
        _this4.chart = _this4.wrapper.getChart();
        _this4.listenToChartEvents();
        _this4.addChartActions();
      });
    } else {
      this.updateDataTable();
      this.wrapper.setDataTable(this.dataTable);
      // this.wrapper.setChartType(this.props.chartType)
      this.wrapper.setOptions(this.props.options);
      if (this.wrapper.getChartType() !== this.props.chartType) {
        window.google.visualization.events.removeAllListeners(this.wrapper);
        this.wrapper.setChartType(this.props.chartType);
        var self = this;
        window.google.visualization.events.addOneTimeListener(this.wrapper, 'ready', function () {
          self.chart = self.wrapper.getChart();
          self.listenToChartEvents.call(self);
        });
      }
    }
    this.wrapper.draw();
  };

  Chart.prototype.addChartActions = function addChartActions() {
    var _this5 = this;

    debug('addChartActions', this.props.chartActions);
    if (this.props.chartActions === null) {
      return;
    }
    this.props.chartActions.forEach(function (chartAction) {
      _this5.chart.setAction({
        id: chartAction.id,
        text: chartAction.text,
        action: chartAction.action.bind(_this5, _this5.chart)
      });
    });
  };

  Chart.prototype.listenToChartEvents = function listenToChartEvents() {
    var _this6 = this;

    debug('listenToChartEvents', this.props.legend_toggle, this.props.chartEvents);
    if (this.props.legend_toggle) {
      window.google.visualization.events.addListener(this.wrapper, 'select', this.onSelectToggle);
    }
    this.props.chartEvents.forEach(function (chartEvent) {
      if (chartEvent.eventName === 'ready') {
        chartEvent.callback(_this6);
      } else {
        (function (event) {
          window.google.visualization.events.addListener(_this6.chart, event.eventName, function (e) {
            event.callback(_this6, e);
          });
        })(chartEvent);
      }
    });
  };

  Chart.prototype.buildColumnFromSourceData = function buildColumnFromSourceData(columnIndex) {
    debug('buildColumnFromSourceData', columnIndex);
    return {
      label: this.dataTable.getColumnLabel(columnIndex),
      type: this.dataTable.getColumnType(columnIndex),
      sourceColumn: columnIndex,
      role: this.dataTable.getColumnRole(columnIndex)
      // above addedBy minam.cho(devbada)
      // cause of 'All series on a given axis must be of the same data type'
      // July 10, 2017
    };
  };

  Chart.prototype.buildEmptyColumnFromSourceData = function buildEmptyColumnFromSourceData(columnIndex) {
    debug('buildEmptyColumnFromSourceData', columnIndex);
    return {
      label: this.dataTable.getColumnLabel(columnIndex),
      type: this.dataTable.getColumnType(columnIndex),
      calc: function calc() {
        return null;
      },
      role: this.dataTable.getColumnRole(columnIndex)
      // above addedBy minam.cho(devbada)
      // cause of 'All series on a given axis must be of the same data type'
      // July 10, 2017
    };
  };

  Chart.prototype.addEmptyColumnTo = function addEmptyColumnTo(columns, columnIndex) {
    debug('addEmptyColumnTo', columns, columnIndex);
    var emptyColumn = this.buildEmptyColumnFromSourceData(columnIndex);
    columns.push(emptyColumn);
  };

  Chart.prototype.hideColumn = function hideColumn(colors, columnIndex) {
    debug('hideColumn', colors, columnIndex);
    if (!this.isHidden(columnIndex)) {
      this.hidden_columns[columnIndex] = {
        color: this.getColumnColor(columnIndex - 1)
      };
    }
    colors.push('#CCCCCC');
  };

  Chart.prototype.addSourceColumnTo = function addSourceColumnTo(columns, columnIndex) {
    debug('addSourceColumnTo', columns, columnIndex);
    var sourceColumn = this.buildColumnFromSourceData(columnIndex);
    columns.push(sourceColumn);
  };

  Chart.prototype.isHidden = function isHidden(columnIndex) {
    return this.hidden_columns[columnIndex] !== undefined;
  };

  Chart.prototype.restoreColorTo = function restoreColorTo(colors, columnIndex) {
    debug('restoreColorTo', colors, columnIndex);
    debug('hidden_columns', this.hidden_columns);
    var previousColor = void 0;
    if (this.isHidden(columnIndex)) {
      previousColor = this.hidden_columns[columnIndex].color;
      delete this.hidden_columns[columnIndex];
    } else {
      previousColor = this.getColumnColor(columnIndex - 1);
    }
    if (columnIndex !== 0) {
      colors.push(previousColor);
    }
  };
  // eslint-disable-next-line class-methods-use-this


  Chart.prototype.debounce = function debounce(func, wait) {
    var timeout = void 0;
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var context = this;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        return func.apply(context, args);
      }, wait);
    };
  };

  Chart.prototype.togglePoints = function togglePoints(column) {
    debug('togglePoints', column);
    var view = new window.google.visualization.DataView(this.wrapper.getDataTable());
    var columnCount = view.getNumberOfColumns();
    var colors = []; // eslint-disable-line prefer-const
    var columns = []; // eslint-disable-line prefer-const
    for (var i = 0; i < columnCount; i += 1) {
      // If user clicked on legend
      if (i === 0) {
        this.addSourceColumnTo(columns, i);
      } else if (i === column) {
        if (this.isHidden(i)) {
          this.addSourceColumnTo(columns, i);
          this.restoreColorTo(colors, i);
        } else {
          this.addEmptyColumnTo(columns, i);
          this.hideColumn(colors, i);
        }
      } else if (this.isHidden(i)) {
        this.addEmptyColumnTo(columns, i);
        this.hideColumn(colors, i);
      } else {
        this.addSourceColumnTo(columns, i);
        this.restoreColorTo(colors, i);
      }
    }
    view.setColumns(columns);
    this.props.options.colors = colors;
    this.chart.draw(view, this.props.options);
  };

  Chart.prototype.render = function render() {
    debug('render', this.props, this.state);
    var divStyle = {
      height: this.props.height || this.props.options.height,
      width: this.props.width || this.props.options.width
    };
    return _react2.default.createElement(
      'div',
      { id: this.state.graphID, style: divStyle },
      this.props.loader ? this.props.loader : 'Rendering Chart...'
    );
  };

  return Chart;
}(_react2.default.Component);

exports.default = Chart;


process.env.NODE_ENV !== "production" ? Chart.propTypes = {
  graph_id: _propTypes2.default.string,
  chartType: _propTypes2.default.string,
  rows: _propTypes2.default.arrayOf(_propTypes2.default.array),
  columns: _propTypes2.default.arrayOf(_propTypes2.default.object),
  data: _propTypes2.default.arrayOf(_propTypes2.default.array),
  options: _propTypes2.default.any,
  width: _propTypes2.default.string,
  height: _propTypes2.default.string,
  onBuildTable: _propTypes2.default.func,
  chartEvents: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    // https://github.com/yannickcr/eslint-plugin-react/issues/819
    eventName: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
    callback: _propTypes2.default.func // eslint-disable-line react/no-unused-prop-types
  })),
  chartActions: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
    text: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
    action: _propTypes2.default.func // eslint-disable-line react/no-unused-prop-types
  })),
  loadCharts: _propTypes2.default.bool,
  loader: _propTypes2.default.node,
  legend_toggle: _propTypes2.default.bool,
  allowEmptyRows: _propTypes2.default.bool,
  chartPackages: _propTypes2.default.arrayOf(_propTypes2.default.string),
  chartVersion: _propTypes2.default.string,
  chartLanguage: _propTypes2.default.string,
  numberFormat: _propTypes2.default.shape({
    column: _propTypes2.default.number, // eslint-disable-line react/no-unused-prop-types
    options: _propTypes2.default.shape({
      decimalSymbol: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
      fractionDigits: _propTypes2.default.number, // eslint-disable-line react/no-unused-prop-types
      groupingSymbol: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
      negativeColor: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
      negativeParens: _propTypes2.default.bool, // eslint-disable-line react/no-unused-prop-types
      pattern: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
      prefix: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
      suffix: _propTypes2.default.string // eslint-disable-line react/no-unused-prop-types
    })
  }),
  dateFormat: _propTypes2.default.shape({
    // eslint-disable-next-line react/no-unused-prop-types
    columns: _propTypes2.default.arrayOf(_propTypes2.default.number),
    options: _propTypes2.default.shape({
      formatType: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
      pattern: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
      timeZone: _propTypes2.default.number // eslint-disable-line react/no-unused-prop-types
    })
  }),
  diffdata: _propTypes2.default.shape({
    on: _propTypes2.default.array, // eslint-disable-line react/no-unused-prop-types
    off: _propTypes2.default.array // eslint-disable-line react/no-unused-prop-types
  })
} : void 0;

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
    width: '100%',
    height: '100%'
  },
  width: '400px',
  height: '300px',
  chartEvents: [],
  chartActions: null,
  data: null,
  legend_toggle: false,
  allowEmptyRows: false,
  loadCharts: true,
  loader: _react2.default.createElement(
    'div',
    null,
    'Rendering Chart'
  ),
  chartPackages: ['corechart'],
  chartVersion: 'current',
  chartLanguage: 'en',
  numberFormat: null,
  dateFormat: null,
  formatters: [],
  diffdata: null
};
module.exports = exports['default'];