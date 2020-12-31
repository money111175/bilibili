<template>
  <div id="app">
      <keep-alive>
        <router-view v-if="$route.meta.keepalive"></router-view>
      </keep-alive>
        <router-view v-if="!$route.meta.keepalive"></router-view>
        <!-- 如果"$route.meta里面的keepalive有状态的话就使用keep-alive里面的router-view，否则就使用外面的router-view -->
  </div>
</template>

<script>
</script>

<style lang="less">
body{
  margin:0;
  padding: 0;
  box-sizing: border-box;
  background-color: white;
}
p{
  margin: 0;
  // padding: 0;
}
</style>
