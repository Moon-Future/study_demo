<template>
  <div class="child-class" name="child-name">
    <h2>I'm Child Component</h2>
    <son-component v-bind="$attrs"></son-component>
  </div>
</template>

<script>
import SonComponent from '@/components/SonComponent'
export default {
  name: 'ChildComponent',
  inheritAttrs: false,
  props: {},
  inject: {
    userName: {
      default: '',
    },
  },
  components: { SonComponent },
  data() {
    return {}
  },
  computed: {},
  created() {
    // console.log('1.', this.userName)
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped></style>
