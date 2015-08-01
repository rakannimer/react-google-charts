//GoogleChartLoader Singleton

// Based on http://blog.arkency.com/2014/09/react-dot-js-and-google-charts/
var q = require('q');
var $ = require('jquery');

var GoogleChartLoader = function(){

	this.is_loading = false;
	this.is_loaded = false;
	this.google_promise = q.defer();
	this.url = "https://www.google.com/jsapi";
	this.packages = ["corechart"];
	this.init = function() {

		if (this.is_loading) {
			return this.google_promise.promise;
		}

		this.is_loading = true;
		var self = this;

	 	var options = {
	    	dataType: "script",
	    	cache: true,
	    	url: this.url,
	  	};
	  	$.ajax(options).done(
	  		function(){
	    		google.load("visualization", "1", {
	      			packages:self.packages,
	      			callback: function() {
	      				self.is_loaded = true;
	        			self.google_promise.resolve();
	      			}
	    		});
	    });
	    return this.google_promise.promise;
	}
};

module.exports = new GoogleChartLoader();

