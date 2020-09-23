import './index.css'

var name = 3
let age = 6
console.log('name: ' + name)

function sum(a, b) {
  let c = 10
  return a + b + c
}

let totol = sum(10, 20)
console.log(totol)

if (module.hot) {
  // 实现热更新
  module.hot.accept()
}
