import { ColorType } from './../../src/settings/color.conf'
//  /dev-api/system/dict/data/type/

import { buildShortUUID } from '@/utils/uuid'
import { MockMethod } from 'vite-plugin-mock'
import { requestParams, resultSuccess } from '../_util'

function generateDictItem(type: string, label: string, value: string, showType: ColorType = 'DEFAULT') {
  return {
    dictCode: buildShortUUID(),
    dictSort: 1,
    dictLabel: label,
    dictValue: value,
    dictType: type,
    showType,
  }
}

const dicts = [
  {
    type: 'sys_normal_disable',
    data: [generateDictItem('sys_normal_disable', '正常', '0'), generateDictItem('sys_normal_disable', '停用', '1', 'DANGER')],
  },
  {
    type: 'sys_test',
    data: [
      generateDictItem('sys_test', '正常', '0'),
      generateDictItem('sys_test', '异常', '1', 'DANGER'),
      generateDictItem('sys_test', '警告', '2', 'WARN'),
      generateDictItem('sys_test', '信息', '3', 'INFO'),
    ],
  },
]

export default [
  {
    url: '/dev-api/system/dict/data/type/:id',
    timeout: 300,
    method: 'get',
    response: ({ query }: requestParams) => {
      const data = dicts.find((item) => item.type === query.id)
      return resultSuccess(data?.data ?? [])
    },
  },
] as MockMethod[]
