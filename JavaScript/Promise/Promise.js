const PENDING = 'pending'
const FULFUILLED = 'fulfilled'
const REJECTED = 'rejected'

const isFuction = (variable) => typeof variable === 'function'

class Promise {
  constructor(executor) {
    if (!isFuction(executor)) {
      throw new Error('Promise param must be a function')
    }

    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledQueue = []
    this.onRejectedQueue = []

    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
      this._reject(err)
    }
  }

  _resolve(value) {
    if (this.status !== PENDING) return
    // setTimeout(() => {
    //   this.value = value
    //   this.status = FULFUILLED
    //   this.onFulfilledQueue.forEach(fn => fn(this.value))
    // }, 0);
    this.value = value
    this.status = FULFUILLED
    this.onFulfilledQueue.forEach((fn) => fn(this.value))
  }

  _reject(reason) {
    if (this.status !== PENDING) return
    // setTimeout(() => {
    //   this.status = REJECTED
    //   this.reason = reason
    //   this.onRejectedQueue.forEach(fn => fn(this.reason))
    // }, 0);
    this.status = REJECTED
    this.reason = reason
    this.onRejectedQueue.forEach((fn) => fn(this.reason))
  }

  then(onFulfilled, onRejected) {
    onFulfilled = isFuction(onFulfilled) ? onFulfilled : (v) => v
    onRejected = isFuction(onRejected)
      ? onRejected
      : (err) => {
          throw err
        }
    let promise2 = new Promise((resolve, reject) => {
      const fn = () => {
        let x
        if (this.status === FULFUILLED) {
          x = onFulfilled(this.value)
          this.resolvePromise(promise2, x, resolve, reject)
        }

        if (this.status === REJECTED) {
          x = onRejected(this.reason)
          this.resolvePromise(promise2, x, resolve, reject)
        }

        if (this.status === PENDING) {
          this.onFulfilledQueue.push(onFulfilled)
          this.onRejectedQueue.push(onRejected)
        }
      }
      setTimeout(() => {
        try {
          fn()
        } catch (e) {
          reject(e)
        }
      }, 0)
    })
    return promise2
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise'))
    }
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        let then = x.then
        if (typeof then === 'function') {
          then.call(
            x,
            (y) => {
              this.resolvePromise(promise2, y, resolve, reject)
            },
            (err) => {
              reject(err)
            }
          )
        } else {
          resolve(x)
        }
      } catch (e) {
        reject(e)
      }
    } else {
      resolve(x)
    }
  }
}

Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = Promise
