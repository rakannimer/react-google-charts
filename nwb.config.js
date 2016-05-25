module.exports = {
  type: 'react-component',
  build: {
    externals: {
      'react': 'React'
    },
    global: 'ReactGoogleCharts',
    jsNext: true,
    umd: true
  }
}
