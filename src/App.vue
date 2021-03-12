<template>
  <div id="app">
    <!-- <a href="taobao:">打开京东</a> -->
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  #app {
    width: 100vw;
    height: 100vh;
  }
</style>
