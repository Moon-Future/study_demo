<template>
  <div class="son-class" name="son-name">
    <h2>I'm Son Component</h2>
  </div>
</template>

<script>
export default {
  name: 'SonComponent',
  props: {},
  inject: {
    userName: { default: '' },
  },
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {
    // console.log('2.', this.userName)
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
