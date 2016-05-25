//GoogleChartLoader Singleton

// Based on http://blog.arkency.com/2014/09/react-dot-js-and-google-charts/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _scriptjs = require('scriptjs');

var _scriptjs2 = _interopRequireDefault(_scriptjs);

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
    this.initPromise = new _bluebird2['default'](function (resolve, reject) {
      if (typeof window !== 'undefined') {
        (0, _scriptjs2['default'])("https://www.gstatic.com/charts/loader.js", function () {

          google.charts.load(version || 'current', { packages: packages || ['corechart'] });
          google.charts.setOnLoadCallback(function () {
            debug('Chart Loaded');
            _this.isLoaded = true;
            _this.isLoading = false;
            resolve();
          });
        });
      } else {
        resolve();
      }
    });
    return this.initPromise;
  }
};

exports['default'] = googleChartLoader;
module.exports = exports['default'];