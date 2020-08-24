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
      // 3. 将编译好的 fragment 放回到页面里去
      this.el.appendChild(fragment)
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

  // 判断是否为指令
  isDirective(name) {
    return name.includes('v-')
  }

  compileElement(node) {
    let attrs = node.attributes
    Array.from(attrs).forEach((attr) => {
      let attrName = attr.name
      // 判断属性名字是否包含v-
      if (this.isDirective(attrName)) {
        let expr = attr.value
        let [, type] = attrName.split('-')
        CompileUtil[type](node, this.vm, expr)
      }
    })
  }

  compileText(node) {
    let expr = node.textContent
    let reg = /\{\{([^}]+)}\}/g
    if (reg.test(expr)) {
      CompileUtil['text'](node, this.vm, expr)
    }
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
      }
    })
  }
}

CompileUtil = {
  getVal(vm, expr) {
    expr = expr.trim().split('.')
    return expr.reduce((prev, next) => {
      return prev[next]
    }, vm.$data)
  },
  getTextVal(vm, expr) {
    return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      return this.getVal(vm, arguments[1])
    })
  },
  text(node, vm, expr) {
    let updateFn = this.updater.textUpdater
    let value = this.getTextVal(vm, expr)
    expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      new Watcher(vm, arguments[1], (newValue) => {
        updateFn && updateFn(node, this.getTextVal(vm, expr))
      })
    })
    updateFn && updateFn(node, value)
  },
  setVal(vm, expr, value) {
    expr = expr.trim().split('.')
    return expr.reduce((prev, next, currentIndex) => {
      if (currentIndex === expr.length - 1) {
        return (prev[next] = value)
      }
      return prev[next]
    }, vm.$data)
  },
  model(node, vm, expr) {
    let updateFn = this.updater.modelUpdater
    // 添加监控，数据变化了，调用watch的callback
    new Watcher(vm, expr, (newValue) => {
      // 当值变化后会调用callback
      updateFn && updateFn(node, newValue)
    })
    node.addEventListener('input', (e) => {
      let newValue = e.target.value
      this.setVal(vm, expr, newValue)
    })
    updateFn && updateFn(node, this.getVal(vm, expr))
  },
  updater: {
    // 文本更新
    textUpdater(node, value) {
      node.textContent = value
    },
    // 输入框更新
    modelUpdater(node, value) {
      node.value = value
    },
  },
}
