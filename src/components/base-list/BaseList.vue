<script lang="ts" setup>
  import { QueryAction, useList } from '@/hooks/list/useList'
  import { toRaw } from 'vue'

  export type ListProps = {
    params?: QueryParams
    action: QueryAction
  }
  const props = defineProps<ListProps>()

  const { list, loading, finished, handleSearch } = useList(props)
</script>

<template>
  <van-list :loading="loading" :finished="finished" finished-text="没有更多了" @load="handleSearch">
    <slot v-for="(item, index) in list" name="item" :index="index" :item="toRaw(item)"> </slot>
  </van-list>
</template>

<style lang="scss" scoped></style>
