// console.log(111)
// const p = new Promise((resolve, reject) => {
//   console.log(222)
//   resolve('haha')
// })

// p.then(res => {
//   console.log('xxx', res)
// })

// p.then(res => {
//   console.log('yyy', res)
// })
// console.log(333, p)

new Promise((resolve, reject) => {
  resolve(new Promise((resolve1, reject1) => {
    resolve1(666)
  }))
}).then(res => {
  console.log('success', res)
}, err => {
  console.log('fail', err)
})
