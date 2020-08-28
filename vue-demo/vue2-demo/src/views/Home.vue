<template>
  <div class="home">
    {{ a }} + {{ b }} = {{ sum }}
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  data() {
    return {
      a: 1,
      b: 2,
    }
  },
  computed: {
    sum() {
      return this.a + this.b
    },
  },
}
</script>
