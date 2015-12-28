var React = require('react');
var GoogleChartLoader = require('./GoogleChartLoader');
var DEFAULT_COLORS = require('../constants/DEFAULT_CHART_COLORS');

var uniqueId = 0;
var generateUniqueId = function() {
	uniqueId++;
	return "reactgooglegraph" + uniqueId;
};

var Chart = React.createClass({
	chart: null,
	wrapper: null,
	hidden_columns: [],
	data_table: [],
	getInitialState: function() {
		return {
			graph_id: this.props.graph_id || generateUniqueId()
		};
	},
	componentDidMount: function(){
		var self = this;

		GoogleChartLoader.init(this.props.chartPackages, this.props.chartVersion).then(function(){
			self.drawChart();
		});
	},

	componentDidUpdate: function(){
		if (GoogleChartLoader.is_loaded){
			this.drawChart();
		};
	},

	getDefaultProps: function() {
		return {
			chartType : 'LineChart',
			rows: [],
			columns: [],
			options: {
				chart: {
					title: 'Chart Title',
					subtitle: 'Subtitle'
				},
				hAxis: {title: 'X Label'},
				vAxis: {title: 'Y Label'},
				width: '400px',
				height: '300px'

			},
			chartEvents : [],
			chartActions : null,
			data: null,
			onSelect: null,
			legend_toggle: false
		};
	},



	render: function() {
		return React.createElement("div", {id: this.state.graph_id, style: {height: this.props.height, width:this.props.width}})
	},
	build_data_table : function() {

		var data_table = new google.visualization.DataTable();
		for (var i = 0 ; i < this.props.columns.length; i++) {
			data_table.addColumn(this.props.columns[i]);
		}

		if (this.props.rows.length > 0) {
			data_table.addRows(this.props.rows);
		}
		return data_table;
	},
	update_data_table : function() {
		this.data_table.removeRows(0, this.data_table.getNumberOfRows());
		this.data_table.removeColumns(0, this.data_table.getNumberOfColumns());

		for (var i = 0; i < this.props.columns.length; i++) {
			this.data_table.addColumn(this.props.columns[i]);
		}

		if (this.props.rows.length > 0) {
			this.data_table.addRows(this.props.rows);
		}
	},

	drawChart: function() {

		if ((this.props.data !== null && this.props.data.length === 0) || this.props.columns.length === 0) {
			return;
		}

		if (!this.wrapper) {
			this.data_table = this.props.data !== null ? this.props.data : this.build_data_table();
			this.wrapper = new google.visualization.ChartWrapper({
				chartType: this.props.chartType,
				dataTable: this.data_table,
				options: this.props.options,
				containerId: this.state.graph_id
			});

			this.data_table = this.wrapper.getDataTable();

			var self = this;

			google.visualization.events.addOneTimeListener(this.wrapper, 'ready', function () {
				self.chart = self.wrapper.getChart();
				self.listen_to_chart_events.call(this);
				self.add_chart_actions.call(this);
			});

			if (this.props.legend_toggle) {
				google.visualization.events.addListener(this.wrapper, 'select', function () {
					self.default_chart_select.call(this);
				});
			}
			if (this.props.onSelect !== null) {
				google.visualization.events.addListener(this.wrapper, 'select', function () {
					self.props.onSelect(self, self.chart.getSelection());
				});
			}
		} else {
			if (this.props.data !== null) {
				this.wrapper.setDataTable(this.props.data);
				this.data_table = this.wrapper.getDataTable();
			} else {
				this.update_data_table();
			}
		}
		this.wrapper.draw();
	},
	listen_to_chart_events: function() {

		var self = this;
		var event_data;
		for (var i = 0; i < this.props.chartEvents.length; i++) {
			if (this.props.chartEvents[i].eventName === 'ready') {
				this.props.chartEvents[i].callback(this);
			}
			else {
				(function(callback){
					google
							.visualization
							.events
							.addListener(self.chart, self.props.chartEvents[i].eventName, function (e){
								callback(self, e);
							});
				})(self.props.chartEvents[i].callback)
			}
		}
	},
	add_chart_actions: function () {
		var self = this;
		// if any action was specified, add it to the chart
		if (this.props.chartActions != null) {
			self.chart.setAction({
				id: this.props.chartActions.id,
				text: this.props.chartActions.text,
				// bind the chart back to the action callback so we can get the chart information
				action: this.props.chartActions.action.bind(self.chart)
			});
		};
	},
	default_chart_select: function() {
		var selection = this.chart.getSelection();
		// if selection length is 0, we deselected an element
		if (selection.length > 0) {
			// if row is undefined, we clicked on the legend
			if (selection[0].row == null) {
				var column = selection[0].column;
				this.toggle_points(column);
			}
		}
	},

	build_empty_column: function(index) {

		return {
			label: this.data_table.getColumnLabel(index),
			type: this.data_table.getColumnType(index),
			calc: function () {
				return null;
			}
		};
	},

	build_column_from_src: function(index) {
		return {
			label: this.data_table.getColumnLabel(index),
			type: this.data_table.getColumnType(index),
			sourceColumn: index
		};
	},

	toggle_points: function(column) {

		//Need to show legend !!

		var view = new google.visualization.DataView(this.wrapper.getDataTable());
		var column_count = view.getNumberOfColumns();
		var colors = [],
				columns = [],
				empty_columns = [],
				column_hidden,
				empty_column,
				column_from_src;

		for (var i = 0; i < column_count; i++) {

			// If user clicked on legend
			if (i === column ) {

				column_hidden = (typeof this.hidden_columns[i] !== 'undefined');

				//User wants to hide values
				if (!column_hidden ) {
					// Null out the values of the column
					empty_column =  this.build_empty_column(i);
					columns.push(empty_column);

					this.hidden_columns[i] = { color : this.get_column_color(i-1) };
					colors.push('#CCCCCC');
				}
				//User wants to show values
				else {
					column_from_src = this.build_column_from_src(i);
					columns.push(column_from_src);

					var previous_color = this.hidden_columns[i].color;
					delete this.hidden_columns[i];
					colors.push(previous_color);
				}
			}
			else if (typeof this.hidden_columns[i] !== 'undefined') {
				empty_column =  this.build_empty_column(i);
				columns.push(empty_column);
				colors.push('#CCCCCC');
			}
			else {
				column_from_src = this.build_column_from_src(i);
				columns.push(column_from_src);

				if (i !== 0) {
					colors.push(this.get_column_color(i-1));
				}
			}
		}

		view.setColumns(columns);
		this.props.options.colors = colors;

		this.chart.draw(view, this.props.options);
	},


	get_column_color: function(column_index) {
		if (this.props.options.colors) {
			if (this.props.options.colors[column_index]) {
				return this.props.options.colors[column_index];
			}
		}
		else {
			if (typeof DEFAULT_COLORS[column_index] !== 'undefined') {
				return DEFAULT_COLORS[column_index];
			}
			else {
				return DEFAULT_COLORS[0];
			}

		}
	}

});

module.exports = Chart;