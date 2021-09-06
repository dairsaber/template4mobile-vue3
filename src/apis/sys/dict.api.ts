import { DictType } from './model/dict.model'
import { request } from '@/utils/http'

enum Api {
  GetDictByType = '/system/dict/data/type',
}

// 获取路由配置
export const getDictByType = (type: string): PromiseResult<DictType[]> => {
  return request.get<Result<DictType[]>>({
    url: `${Api.GetDictByType}/${type}`,
    params: { id: type },
  })
}
