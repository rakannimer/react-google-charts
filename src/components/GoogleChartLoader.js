//GoogleChartLoader Singleton

// Based on http://blog.arkency.com/2014/09/react-dot-js-and-google-charts/
var q = require('q');
var script = require("scriptjs")

var GoogleChartLoader = function(){

	this.is_loading = false;
	this.is_loaded = false;
	this.google_promise = q.defer();

	var self = this;

	this.init = function(packages, version) {
		// Charts can only be loaded once because of the way google implemented this
		// Remember to load all packages you need at the first call
		if (this.is_loading) {
			return this.google_promise.promise;
		}
		this.is_loading = true
		script("https://www.gstatic.com/charts/loader.js", function() {
			google.charts.load(version || 'current', {packages: packages || ['corechart']});
			google.charts.setOnLoadCallback(function() {
				self.is_loaded = true;
  				self.google_promise.resolve();
			})
		})

		return this.google_promise.promise;
	};
};

module.exports = new GoogleChartLoader();

