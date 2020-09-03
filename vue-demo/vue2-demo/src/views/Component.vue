<template>
  <div>
    <child-component class="parent-class" name="parent-name" title="title"></child-component>
    <div>
      <span>a = {{ a }}</span>
      <button @click="a += 1">+</button>
      <button @click="a -= 1">-</button>
    </div>
    <div>
      <span>b = {{ b }}</span>
      <button @click="b += 1">+</button>
      <button @click="b -= 1">-</button>
    </div>
    {{ sum }}
    <button @click="getSum">computed 缓存</button>
  </div>
</template>

<script>
import ChildComponent from '@/components/ChildComponent'
export default {
  name: '',
  props: {},
  provide() {
    return {
      userName: 'ChneLiang',
    }
  },
  components: {
    ChildComponent,
  },
  data() {
    return {
      a: 1,
      b: 2,
    }
  },
  computed: {
    sum() {
      console.log('sum')
      return this.a + this.b
    },
  },
  created() {},
  methods: {
    childCreated() {
      console.log('childCreated')
    },
    childMounted() {
      console.log('childMounted')
    },
    getSum() {
      console.log('getSum', this.sum)
    },
  },
}
</script>

<style lang="scss" scoped></style>
