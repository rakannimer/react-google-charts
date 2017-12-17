/* eslint react/forbid-prop-types: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import DEFAULT_COLORS from '../constants/DEFAULT_CHART_COLORS';
import googleChartLoader from './GoogleChartLoader';

const debug = new Debug('react-google-charts:Chart');

let uniqueID = 0;

const generateUniqueID = () => {
  uniqueID += 1;
  return `reactgooglegraph-${uniqueID}`;
};


export default class Chart extends React.Component {

  constructor(props) {
    debug('constructor', props);
    super(props);
    this.state = { graphID: props.graph_id || generateUniqueID() };
    this.chart = null;
    this.wrapper = null;
    this.hidden_columns = {};
    this.dataTable = [];

    this.debounce = this.debounce.bind(this);
    this.onResize = this.onResize.bind(this);
    this.drawChart = this.drawChart.bind(this);
    this.togglePoints = this.togglePoints.bind(this);
    this.buildDataTableFromProps = this.buildDataTableFromProps.bind(this);
    this.listenToChartEvents = this.listenToChartEvents.bind(this);
    this.addChartActions = this.addChartActions.bind(this);
    this.updateDataTable = this.updateDataTable.bind(this);
    this.onSelectToggle = this.onSelectToggle.bind(this);
    this.addSourceColumnTo = this.addSourceColumnTo.bind(this);
    this.restoreColorTo = this.restoreColorTo.bind(this);
    this.hideColumn = this.hideColumn.bind(this);
  }
  componentDidMount() {
    debug('componentDidMount');
    if (typeof window === 'undefined') {
      return;
    }
    if (this.props.loadCharts) {
      googleChartLoader.init(this.props.chartPackages, this.props.chartVersion, this.props.chartLanguage).then(() => {
        this.drawChart();
      });
      this.onResize = this.debounce(this.onResize, 200);
      window.addEventListener('resize', this.onResize);
    } else {
      this.drawChart();
    }
  }

  componentDidUpdate() {
    debug('componentDidUpdate');
    if (!this.props.loadCharts) {
      this.drawChart();
    } else if (googleChartLoader.isLoading) {
      googleChartLoader.initPromise.then(() => {
        this.drawChart();
      });
    } else if (googleChartLoader.isLoaded) {
      this.drawChart();
    }
  }
  componentWillUnmount() {
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
  }

  onResize() {
    debug('Chart::onResize');
    this.drawChart();
  }

  onSelectToggle() {
    debug('onSelectToggle');
    const selection = this.chart.getSelection();
    if (selection.length > 0) {
      if (selection[0].row == null) {
        const column = selection[0].column;
        this.togglePoints(column);
      }
    }
  }

  getColumnColor(columnIndex) {
    if (this.props.options.colors) {
      if (this.props.options.colors[columnIndex]) {
        return this.props.options.colors[columnIndex];
      }
    } else if (columnIndex in DEFAULT_COLORS) {
      return DEFAULT_COLORS[columnIndex];
    }
    return DEFAULT_COLORS[0];
  }

  buildDataTableFromProps() {
    debug('buildDataTableFromProps', this.props);

    if (this.props.diffdata) {
      const diffdata = this.props.diffdata;
      const oldData = window.google.visualization.arrayToDataTable(diffdata.old);
      const newData = window.google.visualization.arrayToDataTable(diffdata.new);
        // must take computeDiff from prototypes since not available with charts early in process
      const computeDiff = window.google.visualization[this.props.chartType].prototype.computeDiff;
      const chartDiff = computeDiff(oldData, newData);
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
        const dataTable = this.wrapper.getDataTable();
        return dataTable;
      } catch (err) {
        // console.error('Failed to set DataTable from data props ! ', err);
        throw new Error('Failed to set DataTable from data props ! ', err);
      }
    }

    const dataTable = new window.google.visualization.DataTable();
    this.props.columns.forEach((column) => {
      dataTable.addColumn(column);
    });
    dataTable.addRows(this.props.rows);
    
    const applyNumberFormat = (column, options) => {
      const formatter = new window.google.visualization.NumberFormat(options);
      formatter.format(dataTable, column);
    }
    
    const applyDateFormat = (column, options) => {
      const formatter = new window.google.visualization.DateFormat(options);
      formatter.format(dataTable, column);
    }
    
    if (this.props.numberFormat) {
      const { column, options } = this.props.numberFormat;
      this.applyNumberFormat(column, options);
    }

    if (this.props.dateFormat) {
      const { columns, options } = this.props.dateFormat;
      columns.forEach((col) => {
        this.applyDateFormat(col, options)
      });
    }
    
    this.props.formatters.forEach(({ 
      type, 
      column, 
      options 
    }) => {
      switch (type) {
        case 'NumberFormat':
          this.applyNumberFormat(column, options);
        case 'DateFormat':
          this.applyDateFormat(column, options);
        default:
          console.log('Unkown formatter type: ' + type);
          break;
      }
    });

    return dataTable;
  }

  updateDataTable() {
    debug('updateDataTable');
    window.google.visualization.errors.removeAll(
      document.getElementById(this.wrapper.getContainerId())
    );
    this.dataTable.removeRows(0, this.dataTable.getNumberOfRows());
    this.dataTable.removeColumns(0, this.dataTable.getNumberOfColumns());
    this.dataTable = this.buildDataTableFromProps();
    return this.dataTable;
  }

  drawChart() {
    debug('drawChart', this);
    if (!this.wrapper) {
      const chartConfig = {
        chartType: this.props.chartType,
        options: this.props.options,
        containerId: this.state.graphID,
      };
      this.wrapper = new window.google.visualization.ChartWrapper(chartConfig);
      this.dataTable = this.buildDataTableFromProps();
      this.wrapper.setDataTable(this.dataTable);


      window.google.visualization.events.addOneTimeListener(this.wrapper, 'ready', () => {
        this.chart = this.wrapper.getChart();
        this.listenToChartEvents();
        this.addChartActions();
      });
    } else {
      this.updateDataTable();
      this.wrapper.setDataTable(this.dataTable);
       // this.wrapper.setChartType(this.props.chartType)
      this.wrapper.setOptions(this.props.options);
      if (this.wrapper.getChartType() !== this.props.chartType) {
        window.google.visualization.events.removeAllListeners(this.wrapper);
        this.wrapper.setChartType(this.props.chartType);
        const self = this;
        window.google.visualization.events.addOneTimeListener(this.wrapper, 'ready', () => {
          self.chart = self.wrapper.getChart();
          self.listenToChartEvents.call(self);
        });
      }
    }
    this.wrapper.draw();
  }

  addChartActions() {
    debug('addChartActions', this.props.chartActions);
    if (this.props.chartActions === null) {
      return;
    }
    this.props.chartActions.forEach((chartAction) => {
      this.chart.setAction({
        id: chartAction.id,
        text: chartAction.text,
        action: chartAction.action.bind(this, this.chart),
      });
    });
  }

  listenToChartEvents() {
    debug('listenToChartEvents', this.props.legend_toggle, this.props.chartEvents);
    if (this.props.legend_toggle) {
      window.google.visualization.events.addListener(
        this.wrapper,
        'select',
        this.onSelectToggle
      );
    }
    this.props.chartEvents.forEach((chartEvent) => {
      if (chartEvent.eventName === 'ready') {
        chartEvent.callback(this);
      } else {
        ((event) => {
          window.google.visualization.events.addListener(this.chart, event.eventName, (e) => {
            event.callback(this, e);
          });
        })(chartEvent);
      }
    });
  }


  buildColumnFromSourceData(columnIndex) {
    debug('buildColumnFromSourceData', columnIndex);
    return {
      label: this.dataTable.getColumnLabel(columnIndex),
      type: this.dataTable.getColumnType(columnIndex),
      sourceColumn: columnIndex,
      role: this.dataTable.getColumnRole(columnIndex),
        // above addedBy minam.cho(devbada)
        // cause of 'All series on a given axis must be of the same data type'
        // July 10, 2017
    };
  }

  buildEmptyColumnFromSourceData(columnIndex) {
    debug('buildEmptyColumnFromSourceData', columnIndex);
    return {
      label: this.dataTable.getColumnLabel(columnIndex),
      type: this.dataTable.getColumnType(columnIndex),
      calc: () => null,
      role: this.dataTable.getColumnRole(columnIndex),
        // above addedBy minam.cho(devbada)
        // cause of 'All series on a given axis must be of the same data type'
        // July 10, 2017
    };
  }
  addEmptyColumnTo(columns, columnIndex) {
    debug('addEmptyColumnTo', columns, columnIndex);
    const emptyColumn = this.buildEmptyColumnFromSourceData(columnIndex);
    columns.push(emptyColumn);
  }

  hideColumn(colors, columnIndex) {
    debug('hideColumn', colors, columnIndex);
    if (!this.isHidden(columnIndex)) {
      this.hidden_columns[columnIndex] = { color: this.getColumnColor(columnIndex - 1) };
    }
    colors.push('#CCCCCC');
  }
  addSourceColumnTo(columns, columnIndex) {
    debug('addSourceColumnTo', columns, columnIndex);
    const sourceColumn = this.buildColumnFromSourceData(columnIndex);
    columns.push(sourceColumn);
  }

  isHidden(columnIndex) {
    return this.hidden_columns[columnIndex] !== undefined;
  }
  restoreColorTo(colors, columnIndex) {
    debug('restoreColorTo', colors, columnIndex);
    debug('hidden_columns', this.hidden_columns);
    let previousColor;
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
  // eslint-disable-next-line class-methods-use-this
  debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  togglePoints(column) {
    debug('togglePoints', column);
    const view = new window.google.visualization.DataView(this.wrapper.getDataTable());
    const columnCount = view.getNumberOfColumns();
    let colors = []; // eslint-disable-line prefer-const
    let columns = []; // eslint-disable-line prefer-const
    for (let i = 0; i < columnCount; i += 1) {
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
  }

  render() {
    debug('render', this.props, this.state);
    const divStyle = {
      height: this.props.height || this.props.options.height,
      width: this.props.width || this.props.options.width,
    };
    return (
      <div id={this.state.graphID} style={divStyle}>
        {this.props.loader ? this.props.loader : 'Rendering Chart...'}
      </div>
    );
  }
}

Chart.propTypes = {
  graph_id: PropTypes.string,
  chartType: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.array),
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.array),
  options: PropTypes.any,
  width: PropTypes.string,
  height: PropTypes.string,
  chartEvents: PropTypes.arrayOf(PropTypes.shape({
    // https://github.com/yannickcr/eslint-plugin-react/issues/819
    eventName: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    callback: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  })),
  chartActions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    text: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    action: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  })),
  loadCharts: PropTypes.bool,
  loader: PropTypes.node,
  legend_toggle: PropTypes.bool,
  allowEmptyRows: PropTypes.bool,
  chartPackages: PropTypes.arrayOf(PropTypes.string),
  chartVersion: PropTypes.string,
  chartLanguage: PropTypes.string,
  numberFormat: PropTypes.shape({
    column: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    options: PropTypes.shape({
      decimalSymbol: PropTypes.string,  // eslint-disable-line react/no-unused-prop-types
      fractionDigits: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
      groupingSymbol: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
      negativeColor: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
      negativeParens: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
      pattern: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
      prefix: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
      suffix: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    }),
  }),
  dateFormat: PropTypes.shape({
    // eslint-disable-next-line react/no-unused-prop-types
    columns: PropTypes.arrayOf(PropTypes.number),
    options: PropTypes.shape({
      formatType: PropTypes.string,  // eslint-disable-line react/no-unused-prop-types
      pattern: PropTypes.string,  // eslint-disable-line react/no-unused-prop-types
      timeZone: PropTypes.number,  // eslint-disable-line react/no-unused-prop-types
    }),
  }),
  diffdata: PropTypes.shape({
    on: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
    off: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
  }),
};

Chart.defaultProps = {
  chartType: 'LineChart',
  rows: [],
  columns: [],
  options: {
    chart: {
      title: 'Chart Title',
      subtitle: 'Subtitle',
    },
    hAxis: { title: 'X Label' },
    vAxis: { title: 'Y Label' },
    width: '100%',
    height: '100%',
  },
  width: '400px',
  height: '300px',
  chartEvents: [],
  chartActions: null,
  data: null,
  legend_toggle: false,
  allowEmptyRows: false,
  loadCharts: true,
  loader: <div>Rendering Chart</div>,
  chartPackages: ['corechart'],
  chartVersion: 'current',
  chartLanguage: 'en',
  numberFormat: null,
  dateFormat: null,
  formatters: [],
  diffdata: null,
};
