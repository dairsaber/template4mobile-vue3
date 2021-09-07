<script lang="ts" setup>
  import { Tabbar, TabbarItem } from 'vant'
  import { ref } from 'vue'

  const active = ref(0)
</script>

<template>
  <Tabbar v-model="active">
    <TabbarItem icon="home-o"> 首页</TabbarItem>
    <TabbarItem icon="friends-o" badge="5">我的</TabbarItem>
    <TabbarItem icon="setting-o" badge="20">设置</TabbarItem>
  </Tabbar>
</template>

<style lang="scss" scoped></style>
