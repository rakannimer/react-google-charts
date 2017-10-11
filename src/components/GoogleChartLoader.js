// GoogleChartLoader Singleton

// Based on http://blog.arkency.com/2014/09/react-dot-js-and-google-charts/

import Debug from 'debug';

const debug = new Debug('react-google-charts:GoogleChartLoader');
const script = typeof window !== 'undefined' ? require('loadjs') : (link, { success: callback }) => callback();

const googleChartLoader = {
  isLoaded: false,
  isLoading: false,
  initPromise: {},
  init: function init(packages, version, mapsApiKey) {
    debug('init', packages, version, mapsApiKey);
    if (this.isLoading || this.isLoaded) {
      return this.initPromise;
    }
    this.isLoading = true;
    this.initPromise = new Promise((resolve) => {
      script('https://www.gstatic.com/charts/loader.js', { success: () => {
        const opts = { packages: packages || ['corechart'] };
        if (mapsApiKey) {
          opts.mapsApiKey = mapsApiKey;
        }
        window.google.charts.load(version || 'current', opts);
        window.google.charts.setOnLoadCallback(() => {
          debug('Chart Loaded');
          this.isLoaded = true;
          this.isLoading = false;
          resolve();
        });
      } });
    });
    return this.initPromise;
  },
};

export default googleChartLoader;
