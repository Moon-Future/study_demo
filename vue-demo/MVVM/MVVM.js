class MVVM {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data

    // 编译模板
    if (this.$el) {
      // 数据劫持
      new Observer(this.$data)
      this.proxyData(this.$data)
      // 用数据和元素进行编译
      new Compile(this.$el, this)
    }
  }

  proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return data[key]
        },
        set(newValue) {
          data[key] = newValue
        },
      })
    })
  }
}
