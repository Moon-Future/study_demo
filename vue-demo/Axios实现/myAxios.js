/**
 * Axios 简易版实现
 */

class Axios {
  constructor() {
    // 定义拦截器对象
    this.interceptors = {
      // 请求拦截
      request: {
        // 给函数绑定当前的 this，否正 this 指向 request
        use: this.beforeRequest.bind(this),
        success: function () {},
        fail: function () {},
      },

      // 响应拦截
      response: {
        use: this.beforeResponse.bind(this),
        success: function () {},
        fail: function () {},
      },
    }
    // 默认的配置文件
    this.config = {
      // 请求的基础路由
      baseUrl: 'http://127.0.0.1/',
      timeout: 6000,
      method: 'GET',
      dataType: 'JSON',
      responseType: 'text',
      Authorization: '',
      ContentType: 'application/json',
    }
  }

  /**
   * axios 的初始化函数，初始化时对 config 进行赋值
   * 当参数没有传入时，使用默认参数
   * @param baseURL
   * @param timeout
   * @param method
   * @param dataType
   * @param responseType
   * @param ContentType
   * @param Authorization
   */
  static create({
    baseURL = '',
    timeout = 5000,
    method = 'GET',
    dataType = 'json',
    responseType = 'text',
    ContentType = 'application/json',
    Authorization = '',
  } = {}) {
    const axios = new Axios()
    axios.config = {
      baseURL,
      timeout,
      method,
      dataType,
      responseType,
      ContentType,
      Authorization,
    }
  }

  // 请求发送前的拦截函数
  beforeRequest(successFunc, failFunc) {
    /**
     * 成功拦截函数，传入一个config
     * 调用拦截的时候，会调用传入的successFunc函数
     * @param config
     */
    this.interceptors.request.success = (config) => {
      return successFunc(config)
    }
    this.interceptors.request.fail = (error) => {
      return failFunc(error)
    }
  }

  // 请求响应的拦截函数
  beforeResponse(successFunc, failFunc) {
    this.interceptors.response.success = (config) => {
      return successFunc(config)
    }
    this.interceptors.response.fail = (error) => {
      return failFunc(error)
    }
  }

  // 通用 request 函数
  async request() {
    let config = this.config
    return new Promise(async (resolve, reject) => {
      // 请求前的拦截，一定要用await，因为拦截函数可能会有一些异步的操作，即执行 successFunc(config)
      config = await this.interceptors.request.success(config)

      // 如果没有返回参数，请求不再向下执行
      if (!config) return

      // 正式发送请求
      await this.sendRequest(config)
        .then((requestResponse) => {
          let response = {
            statusCode: requestResponse.statusCode,
            config,
            data: requestResponse.data,
            header: requestResponse.header,
            errMsg: requestResponse.errMsg,
          }
          // 执行成功的拦截函数，传入请求的结果
          const result = this.interceptors.response.success(response)
          // 有可能会返回Promise.reject，所以要判断是不是Promise
          if (this._checkIsPromise(result)) {
            result.catch((err) => {
              reject(err)
            })
          } else {
            resolve(result)
          }
        })
        .catch((requestError) => {
          let error = {
            error: requestError,
            response: {
              statusCode: requestError.statusCode,
              config,
              data: requestError.data,
              header: requestError.header,
              errMsg: requestError.errMsg,
            },
          }
          // 执行失败的拦截函数
          const failResult = this.interceptors.response.fail(error)
          if (this._checkIsPromise(failResult)) {
            failResult.catch((err) => {
              reject(err)
            })
          } else {
            reject(failResult)
          }
        })
    })
  }

  // 真正发请求的函数
  sendRequest(config) {
    return new Promise((resolve, reject) => {
      request({
        // 如果是源请求，则不再添加baseURL
        url: config.url,
        method: config.method,
        data: config.data,
        dataType: config.dataType,
        timeout: config.timeout,
        // responseType: config.responseType,
        header: {
          'Content-Type': config.ContentType,
          Authorization: config.Authorization,
        },
        success: (res) => {
          // 404状态码，则让它走fail回调
          if (res.statusCode === 404) {
            reject(res)
            return
          }
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        },
      })
    })
  }

  get() {}

  post() {}

  // 检查是否为Promise
  _checkIsPromise(obj) {
    if (!obj) return
    return Object.toString.call(obj) === '[object Promise]'
  }
}
