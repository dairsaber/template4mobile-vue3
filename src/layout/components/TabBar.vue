<script lang="ts" setup>
  import { Tabbar, TabbarItem } from 'vant'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  type TabBarItemConfig = {
    title: string
    icon: string
    badge?: number
    path: string
  }

  type TabBarProps = {
    items: TabBarItemConfig[]
  }
  const props = defineProps<TabBarProps>()

  const active = ref(0)
  const router = useRouter()
  // 跳转
  const handleChange = (idx: number) => {
    const { path } = props.items[idx]
    const backLen = window.history.length - 1
    window.history.go(-backLen)
    router.replace(path)
  }
</script>

<template>
  <Tabbar v-model="active" class="h-16 bg-gray-200" @change="handleChange">
    <TabbarItem
      v-for="(item, index) in props.items"
      :key="index"
      :icon="item.icon"
      :badge="item.badge"
    >
      {{ item.title }}
    </TabbarItem>
  </Tabbar>
</template>

<style lang="scss" scoped></style>
