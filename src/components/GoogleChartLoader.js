//GoogleChartLoader Singleton

// Based on http://blog.arkency.com/2014/09/react-dot-js-and-google-charts/
import Promise from 'bluebird';
const debug = require('debug')('react-google-charts:GoogleChartLoader');
const script = (typeof window !== 'undefined') ? require('scriptjs') : null;

const googleChartLoader = {

  isLoaded : false,
  isLoading: false,
  initPromise: {},
  init(packages, version) {
    debug('init', packages, version);

    if (this.isLoading || this.isLoaded) {
      return this.initPromise;
    }
    this.isLoading = true;
    this.initPromise =  new Promise((resolve, reject)=> {
      if(typeof window !== 'undefined') {
        script("https://www.gstatic.com/charts/loader.js", () => {

          google.charts.load(version || 'current', {packages: packages || ['corechart']});
          google.charts.setOnLoadCallback(() => {
            debug('Chart Loaded');
            this.isLoaded = true;
            this.isLoading = false;
            resolve();
          });
        });
      }
      else {
        resolve();
      }
    });
    return this.initPromise;
  }
}

export default googleChartLoader;
