<script lang="ts" setup>
  import TabBar from './components/TabBar.vue'
</script>

<template>
  <div class="flex flex-col w-screen h-screen overflow-hidden">
    <div class="flex-1 px-2 overflow-x-hidden overflow-y-auto py-14">
      <router-view />
    </div>
    <TabBar />
  </div>
</template>
<style lang="scss" scoped></style>
