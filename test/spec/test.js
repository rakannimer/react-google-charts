/*global describe, it */
'use strict';


var originalTimeout;
originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000;

(function () {
    describe('GoogleChartLoader', function () {

        it('should be defined', function () {
        	var GoogleChartLoader = require('../../src/components/GoogleChartLoader');
        	expect(GoogleChartLoader).toBeDefined();
        });
        it('should return a promise', function() {
        	var GoogleChartLoader = require('../../src/components/GoogleChartLoader');
        	var q = require('q');
        	var script_loading_promise = GoogleChartLoader.init();
        	expect(q.isPromise(script_loading_promise)).toBeTruthy();
        });
        it('should load google visualization scripts', function(done) {
        	var q = require('q');
        	var $ = require('jquery');
        	spyOn($, "ajax").and.callFake(function(e) {
        		console.log(e);
		        e.done({});

		    });
        	var GoogleChartLoader = require('../../src/components/GoogleChartLoader');
        	GoogleChartLoader.init().then(function() {
        		done();
        	});
        	console.log("Not Loaded");

        });
    });
})();

