const os = require('os')
const Benchmark = require('benchmark') // https://github.com/bestiejs/benchmark.js

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

const _FormatDate0 = (Datenow = 0, mobile = false) => {
  const date = new Date(Datenow)

  // 'HH:mm:ss.SSS'
  const HH = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')
  const SSS = String(date.getMilliseconds()).padStart(3, '0')

  if (!mobile) {
    // 'YYYY-MM-DD HH:mm:ss.SSS'
    const DD = String(date.getDate()).padStart(2, '0')
    const MM = String(date.getMonth() + 1).padStart(2, '0')
    const YYYY = date.getFullYear()
    return `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}.${SSS}`
  }

  return `${HH}:${mm}:${ss}.${SSS}`
}

const _FormatDate1 = (Datenow = 0, mobile = false) => {
  const date = new Date(Datenow)

  // 'HH:mm:ss.SSS'
  const HH = ('0' + date.getHours()).slice(-2)
  const mm = ('0' + date.getMinutes()).slice(-2)
  const ss = ('0' + date.getSeconds()).slice(-2)
  const SSS = ('0' + date.getMilliseconds()).slice(-3)

  if (!mobile) {
    // 'YYYY-MM-DD HH:mm:ss.SSS'
    const DD = ('0' + date.getDate()).slice(-2)
    const MM = ('0' + date.getMonth() + 1).slice(-2)
    const YYYY = date.getFullYear()
    return `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}.${SSS}`
  }

  return `${HH}:${mm}:${ss}.${SSS}`
}

const zeroPad2 = (num) => num < 10 ? '0' + num : num
const zeroPad3 = (num) => {
  if (num < 10) return '00' + num
  else if (num < 100) return '0' + num
  else return num
}
const _FormatDate2 = (Datenow = 0, mobile = false) => {
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

// add tests Uniqe YYYY-MM-DD HH:mm:ss.SSS
const suiteFormatDate = new Benchmark.Suite()
suiteFormatDate
  .add('Native_String()', () => {
    for (let i = 0, len = arrUniqe.length; i < len; i++) {
      _FormatDate0(arrUniqe[i])
    }
  })

  .add('Native_slice(-2)', () => {
    for (let i = 0, len = arrUniqe.length; i < len; i++) {
      _FormatDate1(arrUniqe[i])
    }
  })

  .add('Native_num<10', () => {
    for (let i = 0, len = arrUniqe.length; i < len; i++) {
      _FormatDate2(arrUniqe[i])
    }
  })

  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log()
    console.log('Fastest is ' + suiteFormatDate.filter('fastest').map('name'))
    console.log('\n')
  })
  .run({ 'async': false })

// ///////////////////////////////////////////////////////////////

const _memoizedFormatDateStringTripleEquals = (Datenow = 0) => {
  let cacheInout = 0
  let cacheOutput = ''
  return (Datenow) => {
    if (cacheInout === Datenow) {
      return cacheOutput
    } else {
      const result = _FormatDate2(Datenow)
      cacheInout = Datenow
      cacheOutput = result
      return result
    }
  }
}
const memoizedFormatDateStringTripleEquals = _memoizedFormatDateStringTripleEquals()

const _memoizedFormatDateStringDoubleEquals = (Datenow = 0) => {
  let cacheInout = 0
  let cacheOutput = ''
  return (Datenow) => {
    if (cacheInout == Datenow) {
      return cacheOutput
    } else {
      const result = _FormatDate2(Datenow)
      cacheInout = Datenow
      cacheOutput = result
      return result
    }
  }
}
const memoizedFormatDateStringDoubleEquals = _memoizedFormatDateStringDoubleEquals()

const _memoizedFormatDateStringObjectIs = (Datenow = 0) => {
  let cacheInout = 0
  let cacheOutput = ''
  return (Datenow) => {
    if (Object.is(cacheInout, Datenow)) {
      return cacheOutput
    } else {
      const result = _FormatDate2(Datenow)
      cacheInout = Datenow
      cacheOutput = result
      return result
    }
  }
}
const memoizedFormatDateStringObjectIs = _memoizedFormatDateStringObjectIs()

const _memoizedFormatDateArray = (Datenow) => {
  let cache = []
  return (Datenow) => {
    if (cache[0] === Datenow) {
      return cache[1]
    } else {
      const result = _FormatDate2(Datenow)
      cache[0] = Datenow
      cache[1] = result
      return result
    }
  }
}
const memoizedFormatDateArray = _memoizedFormatDateArray()

const _memoizedFormatDateObject = (Datenow) => {
  let cache = {}
  return (Datenow) => {
    if (cache[Datenow]) {
      return cache[Datenow]
    } else {
      const result = _FormatDate2(Datenow)
      cache = { [Datenow]: result }
      return result
    }
  }
}
const memoizedFormatDateObject = _memoizedFormatDateObject()

const _memoizedFormatDateMapClear = (Datenow) => {
  let cache = new Map()
  return (Datenow) => {
    if (cache.has(Datenow)) {
      return cache.get(Datenow)
    } else {
      const result = _FormatDate2(Datenow)
      cache.clear() // clear() ist notwenig da hier immer nur der letzte wert gecacht werden soll
      // ohne werden alle ${arrUniqe.length} gespeichert und beim nächsten aufruf nur noch wiedergegeben
      cache.set(Datenow, result)
      return result
    }
  }
}
const memoizedFormatDateMapClear = _memoizedFormatDateMapClear()

// add tests Memoized
const suiteMemoizedFormatDate = new Benchmark.Suite()
suiteMemoizedFormatDate
  .add('Native', () => {
    for (let i = 0, len = arrUniqe.length; i < len; i++) {
      _FormatDate2(arrUniqe[i])
    }
  })

  .add('StringTripleEquals', () => {
    for (let i = 0, len = arrDouble.length; i < len; i++) {
      memoizedFormatDateStringTripleEquals(arrDouble[i])
    }
  })

  .add('StringDoubleEquals', () => {
    for (let i = 0, len = arrDouble.length; i < len; i++) {
      memoizedFormatDateStringDoubleEquals(arrDouble[i])
    }
  })

  .add('StringObjectIs', () => {
    for (let i = 0, len = arrDouble.length; i < len; i++) {
      memoizedFormatDateStringObjectIs(arrDouble[i])
    }
  })

  .add('ArrayTripleEquals', () => {
    for (let i = 0, len = arrDouble.length; i < len; i++) {
      memoizedFormatDateArray(arrDouble[i])
    }
  })

  .add('Object', () => {
    for (let i = 0, len = arrDouble.length; i < len; i++) {
      memoizedFormatDateObject(arrDouble[i])
    }
  })

  .add('Map+Clear', () => {
    for (let i = 0, len = arrDouble.length; i < len; i++) {
      memoizedFormatDateMapClear(arrDouble[i])
    }
  })

  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log()
    console.log('Fastest is ' + suiteMemoizedFormatDate.filter('fastest').map('name'))
  })
  .run({ 'async': false })

// cpu: Intel(R) Core(TM) i7 - 9700K CPU @3.60GHz
// NodeJS version: v10.15.3
// platform: win32

// Native_String() x 1, 663 ops / sec ±0.46 % (95 runs sampled)
// Native_slice(-2) x 1, 860 ops / sec ±0.38 % (96 runs sampled)
// Native_num < 10 x 1, 942 ops / sec ±0.46 % (95 runs sampled)

// Fastest is Native_num < 10


// Native x 1, 981 ops / sec ±0.36 % (97 runs sampled)
// StringTripleEquals x 3, 734 ops / sec ±0.70 % (97 runs sampled)
// StringDoubleEquals x 3, 747 ops / sec ±0.76 % (96 runs sampled)
// StringObjectIs x 3, 700 ops / sec ±0.19 % (97 runs sampled)
// ArrayTripleEquals x 3, 678 ops / sec ±0.58 % (96 runs sampled)
// Object x 1, 263 ops / sec ±1.26 % (92 runs sampled)
// Map + Clear x 1, 943 ops / sec ±0.85 % (86 runs sampled)

// Fastest is StringDoubleEquals
