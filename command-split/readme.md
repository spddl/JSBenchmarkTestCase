> cpu: Intel(R) Core(TM) i5-3570K CPU @ 3.40GHz  
> NodeJS version: v10.7.0  
> platform: win32  

- split+shift+join x 4,260,719 ops/sec ±1.03% (91 runs sampled)
- indexOf+substr+slice x 757,855,753 ops/sec ±2.34% (88 runs sampled)
- indexOf+substring+slice x 946,796,328 ops/sec ±2.50% (85 runs sampled)
- indexOf+splice+replace x 19,467,686 ops/sec ±1.83% (82 runs sampled)
- regex.exec x 14,464,585 ops/sec ±1.10% (92 runs sampled)

#### Fastest is **indexOf+substring+slice**

```javascript
  const len = str.indexOf(' ') + 1
  const msg = str.substring(len)
  const cmd = str.slice(0, len - 1)
```