var React = require('react');
var GoogleChartLoader = require('./GoogleChartLoader');
var DEFAULT_COLORS = require('../constants/DEFAULT_CHART_COLORS');
var _ = require('lodash');

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

	    GoogleChartLoader.init().then(function(){
	      self.drawChart();
	    });
	    window.addEventListener('resize', this.onResize);
	    this.onResize = _.debounce(this.onResize, 200);     
	},

	componentDidUpdate: function(){
		if (GoogleChartLoader.is_loaded){
			this.drawChart();	
		};
  },

  componentWillUnmount: function() {
  	window.removeEventListener('resize', this.onResize);
  },

  onResize: function() {
  	console.log('Chart::onResize');
  	this.drawChart();
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
	      	data: null,
	      	onSelect: null,
	        legend_toggle: false
	    };
	},



	render: function() {
		return React.DOM.div({id: this.state.graph_id, style: {height: this.props.height, width:this.props.width}});
	},
	build_data_table : function() {

		var data_table = new google.visualization.DataTable();
		for (var i = 0 ; i < this.props.columns.length; i++) {
			data_table.addColumn(this.props.columns[i].type, this.props.columns[i].label);
		}

		if (this.props.rows.length > 0) {
			data_table.addRows(this.props.rows);	
		}
		return data_table;
	},

	drawChart: function() {

		if (this.props.data !== null ) {
			if (this.props.data.length === 0 ) {
				// Initialized. Do nothing and wait for data
				return;
			}

			this.data_table = this.props.data;
		}
		else if (this.props.columns.length === 0) {
			return;
		}
		else {
			this.data_table = this.build_data_table();
		}
		
		
		this.wrapper = new google.visualization.ChartWrapper({
			chartType: this.props.chartType,
			dataTable: this.data_table,
			options : this.props.options,
			containerId: this.state.graph_id
		});

		this.data_table = this.wrapper.getDataTable();

        var self = this;
        
        google.visualization.events.addOneTimeListener(this.wrapper, 'ready', function() { 
        	self.chart = self.wrapper.getChart();
        	self.listen_to_chart_events.call(this);
        });

        if (this.props.legend_toggle) {
        	google.visualization.events.addListener(this.wrapper, 'select', function() { self.default_chart_select.call(this); });	
        }
        if (this.props.onSelect !== null) {
        	google.visualization.events.addListener(this.wrapper, 'select', function() { self.props.onSelect(self, self.chart.getSelection()); });		
        }
        self.wrapper.draw();
        
    },
    listen_to_chart_events: function() {
    	
    	var self = this;
    	var event_data;
  		for (var i = 0; i < this.props.chartEvents.length; i++) {
  			if (this.props.chartEvents[i].eventName === 'ready') {
  				this.props.chartEvents[i].callback(this);
  			}
  			else {
  				var callback = self.props.chartEvents[i].callback;
  				google.visualization.events.addListener(this.chart, this.props.chartEvents[i].eventName, function(){ callback(self); });
  			}
    		
		}

    	
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
