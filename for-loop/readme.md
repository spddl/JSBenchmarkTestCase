> cpu: Intel(R) Core(TM) i5-3570K CPU @ 3.40GHz  
> NodeJS version: v10.7.0  
> platform: win32  

- forLoop x 7,140,750 ops/sec ±0.28% (94 runs sampled)
- while-- x 6,532,474 ops/sec ±0.33% (90 runs sampled)
- const for of x 6,562,356 ops/sec ±0.36% (91 runs sampled)
- const for in x 978,993 ops/sec ±1.05% (88 runs sampled)
- forEach x 6,938,864 ops/sec ±0.43% (91 runs sampled)

#### Fastest is **forLoop**

```javascript
  for (let i = 0, len = arr.length; i < len; i++) {
    someFn(arr[i])
  }
```