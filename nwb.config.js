module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactGoogleCharts',
      externals: {
        react: 'React'
      }
    }
  }
}
