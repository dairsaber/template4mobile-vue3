<script lang="ts" setup>
  import GlobalHeader from '@/components/global-header/GlobalHeader.vue'

  const navItems = [
    { icon: 'home-o', path: '/plan/form', title: '申请' },
    { icon: 'home-o', path: '/plan/template', title: '模板管理' },
    { icon: 'home-o', path: '/plan/info', title: '计划列表' },
  ]
</script>

<template>
  <GlobalHeader left-arrow />
  <van-grid square>
    <van-grid-item
      v-for="item in navItems"
      :key="item.path"
      :icon="item.icon"
      :text="item.title"
      :to="item.path"
    />
  </van-grid>
</template>

<style lang="scss" scoped></style>
