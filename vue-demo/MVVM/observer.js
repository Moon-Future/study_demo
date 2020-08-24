/**
 * 数据劫持类
 */

class Observer {
  constructor(data) {
    this.observe(data)
  }

  observe(data) {
    if (!data || typeof data !== 'object') {
      return
    }
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
      // 深度劫持
      this.observe(data[key])
    })
  }

  // 定义响应式
  defineReactive(obj, key, value) {
    let that = this
    let dep = new Dep() // 每个变化的数据，都会对应一个数组，这个数组是存放所有更新的操作
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set(newValue) {
        if (newValue != value) {
          // 如果是对象，继续劫持
          that.observe(newValue)
          value = newValue
          dep.notify()
        }
      },
    })
  }
}

/**
 * 发布订阅类
 */
class Dep {
  constructor() {
    // 订阅的数组
    this.subs = []
  }

  addSub(watcher) {
    this.subs.push(watcher)
  }

  notify() {
    this.subs.forEach((watcher) => {
      watcher.update()
    })
  }
}
