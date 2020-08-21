/**
 * 模板编译类
 */

class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm

    if (this.el) {
      // 1. 先把真实DOM移入到内存中
      let fragment = this.node2fragment(this.el)
      // 2. 编译,提取想要的元素节点 v-model 和文本节点 {{}}
      this.compile(fragment)
    }
  }

  // 辅助方法

  /**
   * 判断非否为DOM节点或字符串
   * @param {String | Node} node
   * @return {Boolean}
   */
  isElementNode(node) {
    return node.nodeType === 1
  }

  // 核心方法

  /**
   * 将el中的内容放到内存中操作
   * @param {*} el
   * @return 内存中的节点
   */
  node2fragment(el) {
    let fragment = document.createDocumentFragment()
    while (el.firstChild) {
      fragment.appendChild(el.firstChild)
    }
    return fragment
  }

  /**
   * 编译,提取元素节点
   * @param {*} fragment
   */
  compile(fragment) {
    let childNodes = fragment.childNodes
    Array.from(childNodes).forEach((node) => {
      if (this.isElementNode(node)) {
        // 编译元素节点
        this.compileElement(node)
        // 递归找出所有元素节点
        this.compile(node)
      } else {
        // 文本节点
        this.compileText(node)
        console.log('text', node)
      }
    })
  }

  compileElement(node) {}

  compileText(node) {}
}
