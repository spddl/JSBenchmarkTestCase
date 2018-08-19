> cpu: Intel(R) Core(TM) i5-3570K CPU @ 3.40GHz  
> NodeJS version: v10.7.0  
> platform: win32  

- indexOf+substring+slice x 45,879,385 ops/sec ±2.12% (87 runs sampled)
- array.split x 12,309,945 ops/sec ±1.99% (90 runs sampled)

#### Fastest is **indexOf+substring+slice**

```javascript
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
```