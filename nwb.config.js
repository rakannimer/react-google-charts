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
  babel: {
    presets: ["es2015","react"]
  },
  webpack: {
    aliases: {
      'react-google-charts': path.resolve('./')
    }
  }
}
