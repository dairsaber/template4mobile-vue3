import { AppRouteRecordRaw } from '#/vue-route'
import { RouteRecordRaw } from 'vue-router'

// 本地路由配置
const constantRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/Login.page.vue'),
    meta: { title: '用户登录' },
  },
  {
    path: '',
    component: () => import('@/layout/Main.layout.vue'),
    redirect: '/home',
    hidden: true,
    layout: true,
    meta: { title: '首页', isLayout: true, breadcrumb: false },
    children: [
      //配置在这个children下的路由将会展示在左边menu的第一层 平铺 没有嵌套
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/Home.page.vue'),
        meta: { title: '首页', icon: 'DashboardOutlined' },
      },
      {
        path: 'profile',
        name: 'Profile',
        hidden: true,
        component: () => import('@/views/profile/Profile.page.vue'),
        meta: { title: '个人中心', icon: 'friends-o' },
      },
      {
        path: 'setting',
        name: 'Setting',
        hidden: true,
        component: () => import('@/views/setting/Setting.page.vue'),
        meta: { title: '设置', icon: 'setting-o' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    name: 'Page404',
    hidden: true,
    component: () => import('@/views/error-page/404.page.vue'),
    meta: {
      title: 'page404',
      noCache: true,
    },
  },
]

export default constantRoutes as RouteRecordRaw[]
