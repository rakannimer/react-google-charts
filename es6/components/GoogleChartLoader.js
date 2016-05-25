//GoogleChartLoader Singleton

// Based on http://blog.arkency.com/2014/09/react-dot-js-and-google-charts/
'use strict';

import Promise from 'bluebird';
import script from 'scriptjs';
var debug = require('debug')('react-google-charts:GoogleChartLoader');

var googleChartLoader = {

  isLoaded: false,
  isLoading: false,
  initPromise: {},
  init: function init(packages, version) {
    var _this = this;

    debug('init', packages, version);
    if (this.isLoading || this.isLoaded) {
      return this.initPromise;
    }
    this.isLoading = true;
    this.initPromise = new Promise(function (resolve, reject) {
      script("https://www.gstatic.com/charts/loader.js", function () {

        google.charts.load(version || 'current', { packages: packages || ['corechart'] });
        google.charts.setOnLoadCallback(function () {
          debug('Chart Loaded');
          _this.isLoaded = true;
          _this.isLoading = false;
          resolve();
        });
      });
    });
    return this.initPromise;
  }
};

export default googleChartLoader;