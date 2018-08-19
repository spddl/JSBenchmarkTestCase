const os = require('os')
const Benchmark = require('benchmark') // https://github.com/bestiejs/benchmark.js

console.log(`cpu: ${os.cpus()[0].model}`)
console.log(`NodeJS version: ${process.version}`)
console.log(`platform: ${os.platform()}`)
console.log()

const suite = new Benchmark.Suite()

// Fastest array loops in Javascript https://jsperf.com/fastest-array-loops-in-javascript
const arr = [0, '1', 2, '3', 4, '5', 6, '7', 8, '9', 10, '11', 12, '13', 14, '15', 16, '17', 18, '19']

function someFn (ix) {
  return ix * 5 + 1 / 3 * 8
}

// add tests
suite
.add('forLoop', () => {
  for (let i = 0, len = arr.length; i < len; i++) {
    someFn(arr[i])
  }
})
.add('while--', () => {
  let i = arr.length
  while (i--) {
    someFn(arr[i])
  }
})
.add('const for of', () => {
  for (const o of arr) {
    someFn(o)
  }
})
.add('const for in', () => {
  for (const i in arr) {
    someFn(arr[i])
  }
})
.add('forEach', () => { // Doku https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  arr.forEach((arrValue, i) => {
    someFn(arrValue) // arrValue, i
  })
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
