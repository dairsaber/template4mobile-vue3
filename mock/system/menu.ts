import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from '../_util'

const data = [
  {
    name: 'System',
    path: '/system',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    meta: { title: '系统管理', icon: 'system', noCache: false, link: null },
    children: [
      {
        name: 'User',
        path: 'user',
        hidden: false,
        component: 'system/user/UserManager',
        meta: { title: '用户管理', icon: 'user', noCache: false, link: null },
      },
      {
        name: 'Role',
        path: 'role',
        hidden: false,
        component: 'system/role/index',
        meta: { title: '角色管理', icon: 'peoples', noCache: false, link: null },
      },
      {
        name: 'Menu',
        path: 'menu',
        hidden: false,
        component: 'system/menu/index',
        meta: { title: '菜单管理', icon: 'tree-table', noCache: false, link: null },
      },
      {
        name: 'Dept',
        path: 'dept',
        hidden: false,
        component: 'system/dept/index',
        meta: { title: '部门管理', icon: 'tree', noCache: false, link: null },
      },
      {
        name: 'Post',
        path: 'post',
        hidden: true,
        component: 'system/post/index',
        meta: { title: '岗位管理', icon: 'post', noCache: false, link: null },
      },
      {
        name: 'Dict',
        path: 'dict',
        hidden: false,
        component: 'system/dict/index',
        meta: { title: '字典管理', icon: 'dict', noCache: false, link: null },
      },
      {
        name: 'Config',
        path: 'config',
        hidden: true,
        component: 'system/config/index',
        meta: { title: '参数设置', icon: 'edit', noCache: false, link: null },
      },
      {
        name: 'Notice',
        path: 'notice',
        hidden: true,
        component: 'system/notice/index',
        meta: { title: '通知公告', icon: 'message', noCache: false, link: null },
      },
      {
        name: 'Log',
        path: 'log',
        hidden: true,
        redirect: 'noRedirect',
        component: 'ParentView',

        meta: { title: '日志管理', icon: 'log', noCache: false, link: null },
        children: [
          {
            name: 'Operlog',
            path: 'operlog',
            hidden: false,
            component: 'monitor/operlog/index',
            meta: { title: '操作日志', icon: 'form', noCache: false, link: null },
          },
          {
            name: 'Logininfor',
            path: 'logininfor',
            hidden: false,
            component: 'monitor/logininfor/index',
            meta: { title: '登录日志', icon: 'logininfor', noCache: false, link: null },
          },
        ],
      },
    ],
  },
]

export default [
  {
    url: '/dev-api/getRouters',
    timeout: 500,
    method: 'get',
    response: () => {
      return resultSuccess(data)
    },
  },
] as MockMethod[]
