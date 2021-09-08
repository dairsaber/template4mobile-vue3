import { buildShortUUID } from '@/utils/uuid'
//  /apply/plan/list
import { MockMethod } from 'vite-plugin-mock'
import { requestParams, resultSuccess, pagination } from '../_util'

const getItem = () => ({
  id: buildShortUUID().substr(0, 8),
  // 申报单号
  applyCode: buildShortUUID().substr(1, 17),
  createTime: new Date().toLocaleDateString(),
  // 申请单位
  applyCrop: '申请单位',
  // 审核人
  checkUser: '审核人',
  // 审核状态
  checkStatus: '审核状态',
  // 工程编码
  projectCode: '工程编码',
  repository: '所属仓库',
  // 工程名称
  projectName: 'xxxxxxxxxxxxxxx 工程名',
  //
  applyUser: '申报人',
  // 项目经理
  projectManager: '项目经理',

  // 制表日期
  formCreateDate: new Date().toLocaleDateString(),
  // 状态
  status: ['0', '1', '2', '3'][Math.floor(Math.random() * 4)],
  // 备注
  remark: '备注',
})
const rows = [
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
  getItem(),
]

export default [
  {
    url: '/dev-api/apply/plan/list',
    timeout: 500,
    method: 'get',
    response: ({ query }: requestParams) => {
      const { pageNum, pageSize } = query
      // let filterList = rows
      // if (searchValue) {
      //   filterList = filterList.filter((item) => new RegExp(searchValue).test(item.nickName))
      // }
      const list = pagination(pageNum, pageSize, rows)
      return resultSuccess({
        rows: list,
        total: rows.length,
      })
    },
  },
] as MockMethod[]
