> cpu: Intel(R) Core(TM) i7-9700K CPU @ 3.60GHz  
> NodeJS version: v10.15.3  
> platform: win32  

- fecha x 339 ops / sec ±2.50 % (74 runs sampled)
- dateFns x 190 ops / sec ±1.54 % (73 runs sampled)
- Moment x 412 ops / sec ±2.40 % (85 runs sampled)
- Native x 2,074 ops / sec ±1.23 % (83 runs sampled)
- Native + memoize x 1,962 ops / sec ±0.20 % (95 runs sampled)

#### [Uniqe_YYYY-MM-DD HH:mm:ss.SSS] **Fastest is Native**

- fecha x 518 ops / sec ±2.61 % (78 runs sampled)
- dateFns x 273 ops / sec ±1.80 % (75 runs sampled)
- Moment x 541 ops / sec ±2.57 % (79 runs sampled)
- Native x 2,457 ops / sec ±2.30 % (78 runs sampled)
- Native + memoize x 1,979 ops / sec ±1.50 % (87 runs sampled)

#### [Uniqe_HH:mm:ss.SSS] Fastest is **Native**

- fecha x 366 ops / sec ±3.04 % (77 runs sampled)
- dateFns x 197 ops / sec ±2.46 % (72 runs sampled)
- Moment x 380 ops / sec ±2.95 % (75 runs sampled)
- Native x 2,037 ops / sec ±0.41 % (84 runs sampled)
- Native+memoize x 3,855 ops / sec ±0.58 % (81 runs sampled)

#### [Double_YYYY-MM-DD HH:mm:ss.SSS] Fastest is **Native+memoize**

- fecha x 560 ops / sec ±3.04 % (83 runs sampled)
- fecha_ x 269 ops / sec ±0.85 % (75 runs sampled)
- Moment x 562 ops / sec ±3.08 % (81 runs sampled)
- Native x 2,579 ops / sec ±2.65 % (82 runs sampled)
- Native+memoize x 3,860 ops / sec ±0.53 % (79 runs sampled)

#### [Double_HH:mm:ss.SSS] Fastest is **Native+memoize**

```javascript

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

const _memoizedFormatDate = (Datenow = 0) => {
  let cacheInout = 0
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
const FormatDate = _memoizedFormatDate()

FormatDate(1546300861000)
```
