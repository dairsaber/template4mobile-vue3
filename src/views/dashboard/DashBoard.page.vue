<script lang="ts" setup>
  import { useUserStore } from '@/store/modules/user.store'
  import { computed, onMounted, onUnmounted, ref } from 'vue'

  const currentDate = ref<Date>(new Date())
  const dateStr = computed(() => currentDate.value.toLocaleTimeString())
  let interval: number | null = null
  onMounted(() => {
    interval = window.setInterval(() => {
      currentDate.value = new Date()
    }, 1000)
  })
  onUnmounted(() => {
    interval && window.clearInterval(interval)
  })
  const userStore = useUserStore()
  const handleLogout = () => {
    userStore.logout()
  }
</script>

<template>
  <div class="display">{{ dateStr }}</div>

  <a @click="handleLogout">logout</a>
</template>

<style lang="scss" scoped>
  .display {
    @apply w-32 h-8 mt-1 ml-1 text-xs leading-8 text-center bg-red-400 border-2 border-blue-100 rounded-lg;
  }
</style>
