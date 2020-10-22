console.log('start')
let p = new Promise((resolve, reject) => {
  console.log('promise1')
  resolve(2)
})

console.log('end', p)

p.then(res => {
  console.log('dddd1', res)
  return 3
}).then(res => {
  console.log('dddd2', res)
})
