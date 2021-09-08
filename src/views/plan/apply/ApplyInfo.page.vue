<script lang="ts" setup>
  import { getApplyPlans } from '@/apis/biz/apply.api'
  import { ApplyPlan } from '@/apis/biz/model/apply.model'
  import GlobalHeader from '@/components/global-header/GlobalHeader.vue'
  import { message } from '@/utils/component/message.util'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const goDetail = (item: ApplyPlan) => {
    // TODO 详情功能等待开发
    message.info('TODO 详情功能等待开发')
    console.log(`item`, item)
  }
</script>

<template>
  <GlobalHeader left-arrow />
  <base-content>
    <base-list :action="getApplyPlans" :params="route.params">
      <template #item="{ item, index }">
        <van-swipe-cell>
          <div class="flex items-center w-full">
            <div class="px-2">{{ index + 1 }}</div>
            <van-card
              class="flex-1"
              :num="Math.floor(1 + Math.random() * 10)"
              :desc="item.projectName"
              :title="item.applyCode"
              thumb="https://img.yzcdn.cn/vant/cat.jpeg"
              @click="goDetail(item)"
            />
          </div>
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
  </base-content>
</template>

<style lang="scss" scoped></style>
