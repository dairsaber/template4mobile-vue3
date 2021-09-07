import { AppRouteRecordRaw, Component } from '#/vue-route'

export interface RemoteRoute extends AppRouteRecordRaw {
  id: number
  parentId: number
  path: string
  component: string | Component
  name: string
  num: number
  hidden?: boolean
  children?: RemoteRoute[]
  layout?: boolean // 是否是layout
}
