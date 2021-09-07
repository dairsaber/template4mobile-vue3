<script lang="ts" setup>
  import TabBar from './components/TabBar.vue'

  const tabs = [
    { icon: 'home-o', title: '首页', path: '/home' },
    { icon: 'friends-o', title: '我的', badge: 10, path: '/profile' },
    { icon: 'setting-o', title: '设置', path: '/setting' },
  ]
</script>

<template>
  <div class="flex flex-col w-screen h-screen overflow-hidden">
    <div class="flex-1 py-12 overflow-x-hidden overflow-y-auto">
      <router-view />
    </div>
    <TabBar :items="tabs" />
  </div>
</template>
<style lang="scss" scoped></style>
