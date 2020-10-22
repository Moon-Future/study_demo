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
    this.value = value
    this.status = FULFUILLED
    this.onFulfilledQueue.forEach((fn) => fn())
  }

  _reject(reason) {
    if (this.status !== PENDING) return
    this.status = REJECTED
    this.reason = reason
    this.onRejectedQueue.forEach((fn) => fn())
  }

  then(onFulfilled, onRejected) {
    onFulfilled = isFuction(onFulfilled) ? onFulfilled : (v) => v
    onRejected = isFuction(onRejected) ? onRejected : (err) => { throw err }
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFUILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0);
        }, 0);
      }

      if (this.status === PENDING) {
        this.onFulfilledQueue.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedQueue.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.value)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
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

Promise.resolve = function(val) {
  return new Promise((resolve, reject) => {
    resolve(val)
  })
}

Promise.reject = function(val) {
  return new Promise((resolve, reject) => {
    reject(val)
  })
}

Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0, len = promises.length; i < len; i++) {
      promises[i].then(resolve, reject)
    }
  })
}

Promise.all = function(promises) {
  let arr = []
  let i = 0
  function processData(index, data) {
    arr[index] = data
    i++
    if (i === promises.length) {
      resolve(arr)
    }
  }

  return new Promise((resolve, reject) => {
    for (let i = 0, len = promises.length; i < len; i++) {
      promises[i].then(data => {
        processData(i, data)
      }, reject)
    }
  })
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