<script lang="ts" setup>
  import { QueryAction, useList } from '@/hooks/list/useList'

  export type ListProps = {
    params?: QueryParams
    action: QueryAction
  }
  const props = defineProps<ListProps>()

  const { list, loading, finished, handleSearch } = useList(props)
</script>

<template>
  <van-list
    :loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="handleSearch"
    class="px-4"
  >
    <slot v-for="(item, index) in list" name="item" :key="index" :item="item"> </slot>
  </van-list>
</template>

<style lang="scss" scoped></style>
