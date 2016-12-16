var path = require('path');

module.exports = {
  type: 'react-component',
  build: {
    externals: {
      'react': 'React'
    },
    global: 'ReactGoogleCharts',
    jsNext: true,
    umd: true
  },
  webpack: {
    aliases: {
      'react-google-charts': path.resolve('./')
    }
  }
}
