import { createElement, render, renderDom } from './element'
import diff from './diff'
import patch from './patch'

let virtualDom1 = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item', style: 'color: red' }, ['a']),
  createElement('li', { class: 'item' }, ['b']),
  createElement('li', { class: 'item' }, ['c']),
])

let virtualDom2 = createElement('ul', { class: 'list-group' }, [
  createElement('li', { class: 'item' }, ['1']),
  createElement('li', { class: 'item' }, ['b']),
  createElement('div', { class: 'item' }, ['3']),
  createElement('div', { class: 'item' }, ['6']),
])

// 将虚拟dom转换为真实dom渲染到页面上
let el = render(virtualDom1)
renderDom(el, document.body)

// DOM Diff 比较两个虚拟DOM的区别，即比较两个对象的区别
// DOM Diff 作用：根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新DOM
let patches = diff(virtualDom1, virtualDom2)
console.log(patches)
// 给元素打补丁，重新更新视图
patch(el, patches)
