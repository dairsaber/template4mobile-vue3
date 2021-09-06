import { useUserStore } from '@/store/modules/user.store'
import type { RemoteRoute } from '@/apis/sys/model/remoteRoute.model'
import { getRoutesList } from '@/apis/sys/menu.api'
import { defineStore } from 'pinia'
import Layout from '@/layout/MainLayout.vue'
import ParentView from '@/layout/ParentView.vue'
import constantRoutes from '@/route/constant.route'
import { isString, isUrl } from '@/utils/is'

export type MenuRoute = RemoteRoute & {
  // 全路径
  fullPath: string
  children: MenuRoute[]
  // 路径层级Id数组
  allPath: string[]
}
export type PermissionState = {
  routes: MenuRoute[]
}

export const usePermissionStore = defineStore({
  id: 'permission',
  // a function that returns a fresh state
  state: (): PermissionState => ({
    routes: [],
  }),

  // optional actions
  actions: {
    async setRoutes(): Promise<RemoteRoute[]> {
      const res = await getRoutesList()

      const menus = res.data ?? []
      const routes = menus.concat(constantRoutes as RemoteRoute[])
      const userStore = useUserStore()
      const filterRoutes = filterAsyncRoutes(routes, userStore.roles)
      this.routes = generateAsyncRoutes(filterRoutes)
      return this.routes
    },
  },
})

const hasPermission = (roles: string[], route: RemoteRoute): boolean => {
  if (route.roles) {
    return roles.some((role) => route.roles?.includes(role))
  }
  return true
}
// 根据角色过滤路由菜单
export const filterAsyncRoutes = (routes: RemoteRoute[], roles: string[]): RemoteRoute[] => {
  const res: RemoteRoute[] = []
  routes.forEach((route) => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export const generateAsyncRoutes = (routes: RemoteRoute[], basePath = '', allPath: string[] = []): MenuRoute[] => {
  const asyncRouters = routes.map((route: MenuRoute) => {
    if (route.component && isString(route.component)) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else {
        route.component = loadView(route.component)
      }
    }

    // 组装fullPath
    const fullPath = getFullPath(route, basePath)
    route.fullPath = fullPath
    // 存储全部层级的路径地址
    const currentAllPath = [...allPath, fullPath]
    route.allPath = currentAllPath
    // 如果有子路由，递归添加
    if (route.children && route.children.length) {
      generateAsyncRoutes(route.children, fullPath, currentAllPath)
    }

    return route
  })
  return asyncRouters
}

// 开发环境中解决重复加载导致无法正确加载的问题
let dynamicModules: Recordable<() => Promise<Recordable>>

const loadView = (view: string) => {
  const tempModules = dynamicModules ?? import.meta.glob('../../views/**/*.page.{vue,tsx}')
  // 处理一下 module的 key
  if (!dynamicModules) {
    dynamicModules = Object.keys(tempModules).reduce((prev, current) => {
      const currentKey = current.replace(/(\.vue)|(\.tsx)$/, '')
      prev[currentKey] = tempModules[current]
      return prev
    }, {} as Recordable<() => Promise<Recordable>>)
  }
  const viewReg = view.replace('index', 'Index')
  return dynamicModules[`../../views/${viewReg}.page`]
}

/**
 * 获取全路径
 * @param route
 * @param basePath
 * @returns
 */
function getFullPath(route: RemoteRoute, basePath: string): string {
  let path = route.path
  let fullPath: string
  if (isUrl(path)) {
    fullPath = path
  } else {
    path = path.replace('/', '')
    basePath = basePath.replace(/\/*$/, '')
    fullPath = `${basePath}/${path}`
  }
  return fullPath
}
