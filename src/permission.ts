import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { message } from '@/utils/component/message.util'
import router, { whiteList } from '@/route'
import { RouteLocationNormalized } from 'vue-router'
import { usePermissionStore } from '@/store/modules/permission.store'
import { useUserStore } from '@/store/modules/user.store'
import { isUrl } from '@/utils/is'

import { toRaw } from 'vue'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
  NProgress.start()

  const permissionStore = usePermissionStore()
  const userStore = useUserStore()

  if (userStore.token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (userStore.roles.length === 0) {
        try {
          await userStore.getUserInfo()
          await permissionStore.setRoutes()

          permissionStore.routes.forEach((route) => {
            // 这边过滤掉url的路由
            if (isUrl(route.path)) return false
            router.addRoute(toRaw(route))
          })

          if (to.name === 'Page404') {
            // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
            // fix: 添加query以免丢失
            next({ path: to.fullPath, replace: true, query: to.query })
          } else {
            const redirectPath = (from.query.redirect || to.path) as string
            const redirect = decodeURIComponent(redirectPath)
            const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
            next(nextData)
          }
        } catch (err) {
          console.error(err)
          // Remove token and redirect to login page
          userStore.resetToken()
          message.error('令牌过期')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    // 白名单用 路由名称决定
    if (whiteList.indexOf(to.name as string) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()

  // set page title
  // document.title = getPageTitle(to.meta.title)
})
