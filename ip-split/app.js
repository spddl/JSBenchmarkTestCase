const os = require('os')
const Benchmark = require('benchmark') // https://github.com/bestiejs/benchmark.js

console.log(`cpu: ${os.cpus()[0].model}`)
console.log(`NodeJS version: ${process.version}`)
console.log(`platform: ${os.platform()}`)
console.log()

const suite = new Benchmark.Suite()

let ip = '127.0.0.1'
const Filter = [['0', '256'], ['0', '256'], ['0', '256'], ['0', '256']]
// const Filter = [['0', '256'],['0'],['0'],['0', '256']]

// add tests
suite
.add('indexOf+substring+slice', () => {
  for (let i = 0, len = Filter.length; i < len; i++) {
    let PartLen = ip.indexOf('.') + 1
    if (PartLen === 0) PartLen = 3
    const newip = ip.substring(PartLen)
    const part = ip.slice(0, PartLen - 1)
    ip = newip
    if (Filter[i].length === 1) {
      if (Filter[i][0] !== part) {
        return false
      }
    } else if (Filter[i].length === 2) {
      if (Filter[i][0] > part || Filter[i][1] < part) {
        return false
      }
    } else {
      return true
    }
  }
  return true
})
.add('array.split', () => {
  const array = ip.split('.')
  for (let i = 0, len = Filter.length; i < len; i++) {
    if (Filter[i].length === 1) {
      if (Filter[i][0] !== array[i]) {
        return false
      }
    } else if (Filter[i].length === 2) {
      if (Filter[i][0] > array[i] || Filter[i][1] < array[i]) {
        return false
      }
    } else {
      return true
    }
  }
  return true
})
// add listeners
.on('cycle', (event) => {
  console.log(String(event.target))
})
.on('complete', () => {
  console.log()
  console.log('Fastest is ' + suite.filter('fastest').map('name'))
})
// run async
.run({ 'async': true })
