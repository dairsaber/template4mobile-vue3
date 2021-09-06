import { MockMethod } from 'vite-plugin-mock'
import { requestParams, resultSuccess } from '../_util'

const userInfo = {
  permissions: ['*:*:*'],
  roles: ['admin'],
  user: {
    searchValue: null,
    createBy: 'admin',
    createTime: '2021-08-16 01:37:14',
    updateBy: null,
    updateTime: null,
    remark: '管理员',
    params: {},
    userId: 1,
    deptId: 103,
    userName: 'admin',
    nickName: '管理员',
    email: 'ry@163.com',
    phonenumber: '15888888888',
    sex: '1',
    avatar: '',
    salt: null,
    status: '0',
    delFlag: '0',
    loginIp: '127.0.0.1',
    loginDate: '2021-08-27T10:27:29.795+0800',
    dept: {
      searchValue: null,
      createBy: null,
      createTime: null,
      updateBy: null,
      updateTime: null,
      remark: null,
      params: {},
      deptId: 103,
      parentId: 101,
      ancestors: null,
      deptName: '研发部门',
      orderNum: '1',
      leader: '若依',
      phone: null,
      email: null,
      status: '0',
      delFlag: null,
      parentName: null,
      children: [],
    },
    roles: [
      {
        searchValue: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        params: {},
        roleId: 1,
        roleName: '超级管理员',
        roleKey: 'admin',
        roleSort: '1',
        dataScope: '1',
        menuCheckStrictly: false,
        deptCheckStrictly: false,
        status: '0',
        delFlag: null,
        flag: false,
        menuIds: null,
        deptIds: null,
        admin: true,
      },
    ],
    roleIds: null,
    postIds: null,
    roleId: null,
    admin: true,
  },
}
const login = {
  token: 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjJhMWZkNDEyLWYzZDYtNDRkZi1hODc0LTUwNDNlMWJkZTIxNyJ9.tl4tQuMjg6cbUjpLhKkGFkdb8Qd0YWBng-i719qVj-O39LvXmjTRndttSDnI_sEESWqB9nIR_3v_at7kM1PaXA',
}
export default [
  {
    url: '/dev-api/getInfo',
    timeout: 500,
    method: 'get',
    response: () => {
      return resultSuccess(userInfo)
    },
  },
  {
    url: '/dev-api/login',
    timeout: 200,
    method: 'post',
    response: (request: requestParams) => {
      const username = request.body.username
      const password = request.body.password
      if (username === 'admin' && password === 'admin123') {
        return resultSuccess(login)
      } else {
        return resultSuccess(login, { code: 401, msg: '用户名密码有问题' })
      }
    },
  },
] as MockMethod[]
