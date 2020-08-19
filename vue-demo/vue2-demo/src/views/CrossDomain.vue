<template>
  <div class="">
    <h2>跨域测试</h2>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'crossDomain',
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {
    // this.getData()
    this.jsonp({
      url: 'http://localhost:3000/getName',
      callback: 'cb',
    }).then((res) => {
      console.log('res', res)
      console.log(window.cb)
    })
  },
  methods: {
    getData() {
      axios.get('http://localhost:3000/getName').then((res) => {
        console.log(res)
      })
    },
    jsonp({ url, params, callback }) {
      return new Promise((resolve) => {
        let arr = []
        params = { ...params, callback }
        for (let key in params) {
          arr.push(`${key}=${params[key]}`)
        }
        window[callback] = function(res) {
          resolve(res)
          document.body.removeChild(script)
          delete window[callback]
        }
        let script = document.createElement('script')
        script.src = `${url}?${arr.join('&')}`
        document.body.append(script)
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
