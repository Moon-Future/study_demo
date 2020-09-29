import $ from '@/lib/jquery.js'

console.log($)

function getPageName() {
  console.log('This is PageA www')
}

getPageName()

var a = 'ChenLiang'
console.log(a)

if (module.hot) {
  // 实现热更新，只重新加载修改过的文件，不会刷新整个页面
  module.hot.accept();
}
