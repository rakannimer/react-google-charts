const path = require('path')
const fs = require('fs')

const chartTypes = fs.readdirSync('sandboxes').filter(_ => !_.includes('.'))

function indexChartType(chartType) {
  const chartTypePath = path.join('sandboxes', chartType)
  const chartTypeSandboxes = fs.readdirSync(chartTypePath)
  const index = chartTypeSandboxes.reduce((index, chartTypeSandbox) => {
    const chartTypeSandboxPath = path.join(chartTypePath, chartTypeSandbox)
    const pkgPath = path.join(chartTypeSandboxPath, 'package.json')
    const { description: title } = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
    const sandboxInfo = { id: chartTypeSandbox, title, chartType }

    if (chartTypeSandbox === 'default') {
      index.unshift(sandboxInfo)
    } else {
      index.push(sandboxInfo)
    }

    return index
  }, [])

  return index
}

chartTypes.forEach((chartType) => {
  const chartTypeIndexPath = path.join('sandboxes', chartType, 'index.js')
  const index = indexChartType(chartType)
  const moduleString = `module.exports = ${JSON.stringify(index, null, '  ')};\n`

  fs.writeFileSync(chartTypeIndexPath, moduleString)
})
