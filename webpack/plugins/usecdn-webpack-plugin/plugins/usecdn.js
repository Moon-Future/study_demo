class UsecdnWebpackPlugin {
  // constructor(options) {
  //   this.options = options
  //   console.log(this.options)
  // }

  apply(compiler) {
    compiler.hooks.compilation.tap('UsecdnWebpackPlugin', (compilation) => {
      compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
        // htmlPluginData.html += 'The magic footer'
        // callback(null, htmlPluginData)
        console.log('xxxxxxx', htmlPluginData)
      })
    })

    // compiler.hooks.compilation.tap('UsecdnWebpackPlugin', (compilation) => {
    //   compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap('UsecdnWebpackPlugin', (data, cb) => {
    //     // Do stuff
    //     console.log('data', data)
    //     cb()
    //   })
    // })
  }
}

module.exports = UsecdnWebpackPlugin