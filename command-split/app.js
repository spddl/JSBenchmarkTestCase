const os = require('os')
const Benchmark = require('benchmark') // https://github.com/bestiejs/benchmark.js

console.log(`cpu: ${os.cpus()[0].model}`)
console.log(`NodeJS version: ${process.version}`)
console.log(`platform: ${os.platform()}`)
console.log()

const suite = new Benchmark.Suite()

const str = '!cmd textfield 123'
const regex = /^([!][a-z]*)[ ]?(.*)/

// add tests
suite
.add('split+shift+join', () => {
  const arr = str.split(' ')
  const cmd = arr[0]
  arr.shift()
  const msg = arr.join(' ')
})
.add('indexOf+substr+slice', () => {
  const len = str.indexOf(' ') + 1
  const msg = str.substr(len)
  const cmd = str.slice(0, len - 1)
})
.add('indexOf+substring+slice', () => {
  const len = str.indexOf(' ') + 1
  const msg = str.substring(len)
  const cmd = str.slice(0, len - 1)
})
.add('indexOf+splice+replace', () => {
  const len = str.indexOf(' ') + 1
  const cmd = str.slice(0, len - 1)
  const msg = str.replace(cmd, '')
})
.add('regex.exec', () => {
  let msg
  let cmd
  const found = regex.exec(str)
  if (found !== null) {
    cmd = found[1]
    msg = found[2]
  }
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
