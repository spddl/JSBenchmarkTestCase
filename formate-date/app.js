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

const _memoizedFormatDate = (Datenow) => {
  let cacheInout = ''
  let cacheOutput = ''
  return (Datenow) => {
    if (cacheInout === Datenow) {
      return cacheOutput
    } else {
      const result = _FormatDate(Datenow)
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

// cpu: Intel(R) Core(TM) i7 - 9700K CPU @3.60GHz
// NodeJS version: v10.15.3
// platform: win32

// fecha x 339 ops / sec ±2.50 % (74 runs sampled)
// dateFns x 190 ops / sec ±1.54 % (73 runs sampled)
// Moment x 412 ops / sec ±2.40 % (85 runs sampled)
// Native x 2, 074 ops / sec ±1.23 % (83 runs sampled)
// Native+memoize x 1, 962 ops / sec ±0.20 % (95 runs sampled)

// [Uniqe_YYYY - MM - DD HH: mm: ss.SSS] Fastest is Native

// fecha x 518 ops / sec ±2.61 % (78 runs sampled)
// dateFns x 273 ops / sec ±1.80 % (75 runs sampled)
// Moment x 541 ops / sec ±2.57 % (79 runs sampled)
// Native x 2, 457 ops / sec ±2.30 % (78 runs sampled)
// Native+memoize x 1, 979 ops / sec ±1.50 % (87 runs sampled)

// [Uniqe_HH: mm: ss.SSS] Fastest is Native

// fecha x 366 ops / sec ±3.04 % (77 runs sampled)
// dateFns x 197 ops / sec ±2.46 % (72 runs sampled)
// Moment x 380 ops / sec ±2.95 % (75 runs sampled)
// Native x 2, 037 ops / sec ±0.41 % (84 runs sampled)
// Native+memoize x 3, 855 ops / sec ±0.58 % (81 runs sampled)

// [Double_YYYY - MM - DD HH: mm: ss.SSS] Fastest is Native+memoize

// fecha x 560 ops / sec ±3.04 % (83 runs sampled)
// fecha_ x 269 ops / sec ±0.85 % (75 runs sampled)
// Moment x 562 ops / sec ±3.08 % (81 runs sampled)
// Native x 2, 579 ops / sec ±2.65 % (82 runs sampled)
// Native+memoize x 3, 860 ops / sec ±0.53 % (79 runs sampled)

// [Double_HH: mm: ss.SSS] Fastest is Native+memoize
