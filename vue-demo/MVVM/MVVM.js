class MVVM {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data

    // 编译模板
    if (this.$el) {
      new Compile(this.$el, this)
    }
  }
}
