<script lang="ts" setup>
  import { isPromise } from '@/utils/is'
  import { useAttrs, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const props = defineProps<{ title?: string; backable?: Fn<void, boolean> }>()
  const attrs = useAttrs()

  const router = useRouter()
  const route = useRoute()

  // 回退
  const handleBack = async () => {
    let backable: boolean | Promise<boolean> = props.backable?.() ?? true
    if (isPromise(backable)) {
      backable = (await backable) as boolean
    }
    if (backable) {
      router.back()
    }
  }

  // 标题
  const titleRef = computed(() => {
    return props.title ?? route.meta?.title ?? ''
  })
</script>

<template>
  <van-nav-bar
    class="h-12 bg-gray-200"
    :title="titleRef"
    @click-left="handleBack"
    safe-area-inset-top
    fixed
    v-bind="attrs"
  />
</template>

<style lang="scss" scoped></style>
