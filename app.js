// Online Tests
// - NodeJS https://npm.runkit.com/benchmarkjs
// - Browser https://jsperf.com

module.exports = {
  CommandSplit: () => require('./command-split/app.js'),
  ForLoop: () => require('./for-loop/app.js'),
  IPSplit: () => require('./ip-split/app.js')
}
