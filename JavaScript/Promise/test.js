const Promise = require('./Promise.js')

console.log('start')
let p = new Promise((resolve, reject) => {
  console.log('promise1')
  resolve(2)
})

p.then(res => {
  console.log('dddd1', res)
  return 3
}).then(res => {
  console.log('dddd2', res)
})

console.log('end', p)



