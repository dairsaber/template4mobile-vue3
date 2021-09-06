<script lang="ts">
  export default {
    name: 'GoTo',
  }
</script>

<script lang="ts" setup>
  import { isUrl, isString, isObject } from '@/utils/is'
  import { RouteLocationRaw, useRouter } from 'vue-router'

  type GoToProps = {
    to: RouteLocationRaw
  }
  const props = defineProps<GoToProps>()
  const router = useRouter()
  const handleGoTo = () => {
    const route = props.to
    let path = ''
    if (isString(route)) path = route
    if (isObject(route)) path = route.path as string

    if (isUrl(path)) {
      window.open(path, 'target')
    } else {
      router.push(route)
    }
  }
</script>

<template>
  <a @click.stop="handleGoTo"><slot /></a>
</template>

<style lang="scss" scoped></style>
