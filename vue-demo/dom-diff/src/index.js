import { createElement, render, renderDom } from './element'

let virtualDom = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item', style: 'color: red' }, ['a']),
  createElement('li', { class: 'item' }, ['b']),
  createElement('li', { class: 'item' }, ['c']),
])

// 将虚拟dom转换为真实dom渲染到页面上
let el = render(virtualDom)
renderDom(el, document.body)
console.log(virtualDom)
