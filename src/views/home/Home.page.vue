<script lang="ts" setup>
  import { RemoteRoute } from '@/apis/sys/model/remoteRoute.model'
  import { usePermissionStore } from '@/store/modules/permission.store'
  import { computed, toRaw } from 'vue'
  import GlobalHeader from '@/components/global-header/GlobalHeader.vue'
  type NavItem = { icon?: string; path: string; title?: string }

  const permissionStore = usePermissionStore()
  const navs = permissionStore.routes

  // 将导航展平
  const getNavItems = (navs: RemoteRoute[]) => {
    const filteItems = navs.filter((item) => !item.hidden)
    let items: NavItem[] = []

    filteItems.forEach((item) => {
      const { fullPath, meta, children, layout } = item
      if (children && children.length > 0) {
        items = items.concat(getNavItems(children))
      }
      if (!layout) {
        items.push({
          icon: meta?.icon,
          path: fullPath || '',
          title: meta?.title,
        })
      }
    })

    return items
  }
  // 导航item
  const navItems = computed(() => getNavItems(navs))
</script>

<template>
  <GlobalHeader />
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
