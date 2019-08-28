const os = require('os')
const Benchmark = require('benchmark') // https://github.com/bestiejs/benchmark.js

const fecha = require('fecha') // https://github.com/taylorhakes/fecha
const dateFns = require('date-fns') // https://www.npmjs.com/package/date-fns
const moment = require('moment') // https://www.npmjs.com/package/moment

console.log(`cpu: ${os.cpus()[0].model}`)
console.log(`NodeJS version: ${process.version}`)
console.log(`platform: ${os.platform()}`)
console.log()

const firstDate = 1546300861000

const arrUniqe = []
for (let i = 0, len = 1000; i < len; i++) {
  arrUniqe.push(firstDate + i)
}

const arrDouble = []
for (let i = 0, len = 500; i < len; i++) {
  for (let _i = 0, len = 2; _i < len; _i++) {
    arrDouble.push(firstDate + i)
  }
}

const zeroPad2 = (num) => num < 10 ? '0' + num : num
const zeroPad3 = (num) => {
  if (num < 10) return '00' + num
  else if (num < 100) return '0' + num
  else return num
}
const _FormatDate = (Datenow = 0, mobile = false) => {
  const date = new Date(Datenow)

  // 'HH:mm:ss.SSS'
  const HH = zeroPad2(date.getHours())
  const mm = zeroPad2(date.getMinutes())
  const ss = zeroPad2(date.getSeconds())
  const SSS = zeroPad3(date.getMilliseconds())

  if (!mobile) {
    // 'YYYY-MM-DD HH:mm:ss.SSS'
    const DD = zeroPad2(date.getDate())
    const MM = zeroPad2(date.getMonth())
    const YYYY = date.getFullYear()
    return `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}.${SSS}`
  }

  return `${HH}:${mm}:${ss}.${SSS}`
}

const _memoizedFormatDate = (Datenow = 0, mobile) => {
  let cacheInout = 0
  let cacheOutput = ''
  return (Datenow, mobile) => {
    if (cacheInout === Datenow) {
      return cacheOutput
    } else {
      const result = _FormatDate(Datenow, mobile)
      cacheInout = Datenow
      cacheOutput = result
      return result
    }
  }
}
const memoizedFormatDate = _memoizedFormatDate()

// add tests Uniqe YYYY-MM-DD HH:mm:ss.SSS
const suiteUniqeYYYY = new Benchmark.Suite()
suiteUniqeYYYY
  // fecha
  .add('fecha', () => {
    for (let i = 0, len = arrUniqe.length; i < len; i++) {
      fecha.format(new Date(arrUniqe[i]), 'YYYY-MM-DD HH:mm:ss.SSS')
    }
  })

  // date-fns
  .add('dateFns', () => {
    for (let i = 0, len = arrUniqe.length; i < len; i++) {
      dateFns.format(arrUniqe[i], 'yyyy-MM-dd HH:mm:ss.SSS')
    }
  })

  // Moment
  .add('Moment', () => {
    for (let i = 0, len = arrUniqe.length; i < len; i++) {
      moment(arrUniqe[1]).format('YYYY-MM-DD HH:mm:ss.SSS')
    }
  })

  // Native
  .add('Native', () => {
    for (let i = 0, len = arrUniqe.length; i < len; i++) {
      _FormatDate(arrUniqe[i])
    }
  })

  // Native + memoize
  .add('Native+memoize', () => {
    for (let i = 0, len = arrUniqe.length; i < len; i++) {
      memoizedFormatDate(arrUniqe[i])
    }
  })

  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log()
    console.log('[Uniqe_YYYY-MM-DD HH:mm:ss.SSS] Fastest is ' + suiteUniqeYYYY.filter('fastest').map('name'))
    console.log('\n')
  })
  .run({ 'async': false })

// add tests Uniqe HH:mm:ss.SSS
const suiteUniqe = new Benchmark.Suite()
suiteUniqe
  // fecha
  .add('fecha', () => {
    for (let i = 0, len = arrUniqe.length; i < len; i++) {
      fecha.format(new Date(arrUniqe[i]), 'HH:mm:ss.SSS')
    }
  })

  // date-fns
  .add('dateFns', () => {
    for (let i = 0, len = arrUniqe.length; i < len; i++) {
      dateFns.format(arrUniqe[i], 'HH:mm:ss.SSS')
    }
  })

  // Moment
  .add('Moment', () => {
    for (let i = 0, len = arrUniqe.length; i < len; i++) {
      moment(arrUniqe[1]).format('HH:mm:ss.SSS')
    }
  })

  // Native
  .add('Native', () => {
    for (let i = 0, len = arrUniqe.length; i < len; i++) {
      _FormatDate(arrUniqe[i], true)
    }
  })

  // Native + memoize
  .add('Native+memoize', () => {
    for (let i = 0, len = arrUniqe.length; i < len; i++) {
      memoizedFormatDate(arrUniqe[i], true)
    }
  })

  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log()
    console.log('[Uniqe_HH:mm:ss.SSS] Fastest is ' + suiteUniqe.filter('fastest').map('name'))
    console.log('\n')
  })
  .run({ 'async': false })

// add tests Double YYYY-MM-DD HH:mm:ss.SSS
const suiteDoubleYYYY = new Benchmark.Suite()
suiteDoubleYYYY
  // fecha
  .add('fecha', () => {
    for (let i = 0, len = arrDouble.length; i < len; i++) {
      fecha.format(new Date(arrDouble[i]), 'YYYY-MM-DD HH:mm:ss.SSS')
    }
  })

  // date-fns
  .add('dateFns', () => {
    for (let i = 0, len = arrDouble.length; i < len; i++) {
      dateFns.format(arrDouble[i], 'yyyy-MM-dd HH:mm:ss.SSS')
    }
  })

  // Moment
  .add('Moment', () => {
    for (let i = 0, len = arrDouble.length; i < len; i++) {
      moment(arrDouble[1]).format('YYYY-MM-DD HH:mm:ss.SSS')
    }
  })

  // Native
  .add('Native', () => {
    for (let i = 0, len = arrDouble.length; i < len; i++) {
      _FormatDate(arrDouble[i])
    }
  })

  // Native + memoize
  .add('Native+memoize', () => {
    for (let i = 0, len = arrDouble.length; i < len; i++) {
      memoizedFormatDate(arrDouble[i])
    }
  })

  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log()
    console.log('[Double_YYYY-MM-DD HH:mm:ss.SSS] Fastest is ' + suiteDoubleYYYY.filter('fastest').map('name'))
    console.log('\n')
  })
  .run({ 'async': false })

// add tests Double HH:mm:ss.SSS
const suiteDouble = new Benchmark.Suite()
suiteDouble
  // fecha
  .add('fecha', () => {
    for (let i = 0, len = arrDouble.length; i < len; i++) {
      fecha.format(new Date(arrDouble[i]), 'HH:mm:ss.SSS')
    }
  })

  // date-fns
  .add('fecha_', () => {
    for (let i = 0, len = arrDouble.length; i < len; i++) {
      dateFns.format(arrDouble[i], 'HH:mm:ss.SSS')
    }
  })

  // Moment
  .add('Moment', () => {
    for (let i = 0, len = arrDouble.length; i < len; i++) {
      moment(arrDouble[1]).format('HH:mm:ss.SSS')
    }
  })

  // Native
  .add('Native', () => {
    for (let i = 0, len = arrDouble.length; i < len; i++) {
      _FormatDate(arrDouble[i], true)
    }
  })

  // Native + memoize
  .add('Native+memoize', () => {
    for (let i = 0, len = arrDouble.length; i < len; i++) {
      memoizedFormatDate(arrDouble[i], true)
    }
  })

  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log()
    console.log('[Double_HH:mm:ss.SSS] Fastest is ' + suiteDouble.filter('fastest').map('name'))
    console.log('\n')
  })
  .run({ 'async': false })
  
/*
cpu: Intel(R) Core(TM) i7-9700K CPU @ 3.60GHz
NodeJS version: v10.15.3
platform: win32

fecha x 318 ops/sec ±1.42% (88 runs sampled)
dateFns x 182 ops/sec ±1.34% (83 runs sampled)
Moment x 371 ops/sec ±0.54% (89 runs sampled)
Native x 1,993 ops/sec ±0.38% (95 runs sampled)
Native+memoize x 1,924 ops/sec ±0.47% (97 runs sampled)

[Uniqe_YYYY-MM-DD HH:mm:ss.SSS] Fastest is Native


fecha x 456 ops/sec ±0.83% (91 runs sampled)
dateFns x 266 ops/sec ±0.36% (89 runs sampled)
Moment x 495 ops/sec ±0.42% (92 runs sampled)
Native x 2,217 ops/sec ±2.67% (96 runs sampled)
Native+memoize x 2,212 ops/sec ±0.34% (96 runs sampled)

[Uniqe_HH:mm:ss.SSS] Fastest is Native+memoize


fecha x 325 ops/sec ±1.08% (90 runs sampled)
dateFns x 185 ops/sec ±0.61% (85 runs sampled)
Moment x 357 ops/sec ±0.78% (90 runs sampled)
Native x 1,989 ops/sec ±0.37% (97 runs sampled)
Native+memoize x 3,772 ops/sec ±0.84% (96 runs sampled)

[Double_YYYY-MM-DD HH:mm:ss.SSS] Fastest is Native+memoize


fecha x 457 ops/sec ±0.53% (92 runs sampled)
fecha_ x 261 ops/sec ±1.14% (88 runs sampled)
Moment x 490 ops/sec ±0.57% (90 runs sampled)
Native x 2,300 ops/sec ±0.20% (96 runs sampled)
Native+memoize x 4,347 ops/sec ±0.62% (97 runs sampled)

[Double_HH:mm:ss.SSS] Fastest is Native+memoize
*/