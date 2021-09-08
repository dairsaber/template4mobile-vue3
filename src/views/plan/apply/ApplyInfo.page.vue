<script lang="ts" setup>
  import { getApplyPlans } from '@/apis/biz/apply.api'
  import GlobalHeader from '@/components/global-header/GlobalHeader.vue'
</script>

<template>
  <GlobalHeader left-arrow />
  <base-list :action="getApplyPlans">
    <template #item="{ item }">
      {{ item }}
      <van-swipe-cell>
        <van-card
          num="2"
          price="2.00"
          :desc="item.projectName"
          :title="item.applyCode"
          class="goods-card"
          thumb="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <template #left>
          <van-button square text="删除" type="danger" class="h-full" />
        </template>
        <template #right>
          <van-button square text="送审" type="primary" class="h-full" />
          <van-button square text="拆分" type="warning" class="h-full" />
        </template>
      </van-swipe-cell>
    </template>
  </base-list>
</template>

<style lang="scss" scoped></style>
