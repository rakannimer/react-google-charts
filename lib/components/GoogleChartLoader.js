'use strict';

exports.__esModule = true;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default('react-google-charts:GoogleChartLoader'); // GoogleChartLoader Singleton

// Based on http://blog.arkency.com/2014/09/react-dot-js-and-google-charts/

var script = typeof window !== 'undefined' ? require('loadjs') : function (link, _ref) {
  var callback = _ref.success;
  return callback();
};

var googleChartLoader = {
  isLoaded: false,
  isLoading: false,
  initPromise: {},
  init: function init(packages, version, language) {
    var _this = this;

    debug('init', packages, version, language);
    if (this.isLoading || this.isLoaded) {
      return this.initPromise;
    }
    this.isLoading = true;
    this.initPromise = new Promise(function (resolve) {
      script('https://www.gstatic.com/charts/loader.js', { success: function success() {
          window.google.charts.load(version || 'current', { packages: packages || ['corechart'], language: language || 'en' });
          window.google.charts.setOnLoadCallback(function () {
            debug('Chart Loaded');
            _this.isLoaded = true;
            _this.isLoading = false;
            resolve();
          });
        } });
    });
    return this.initPromise;
  }
};

exports.default = googleChartLoader;
module.exports = exports['default'];