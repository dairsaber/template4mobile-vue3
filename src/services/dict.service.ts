import { DictType } from './../apis/sys/model/dict.model'
import { getDictByType } from '@/apis/sys/dict.api'

const cache: Recordable<Promise<Result<DictType[]>> | DictType[]> = {}

/**
 * 根据字典名称获取字典项
 * @param dictType 字典名称
 * @returns
 */
export async function getDict(dictType: string): Promise<DictType[]> {
  const cacheDict = cache[dictType]
  // 解决同一个字典在同一时间并发问题
  if (cacheDict instanceof Promise) {
    const { data } = await cacheDict
    cache[dictType] = data || []
    return cache[dictType] as DictType[]
  } else if (cacheDict) {
    return cacheDict
  }
  // 这步必须使用同步代码将其送入缓存 否则不起效果
  cache[dictType] = getDictByType(dictType) as Promise<Result<DictType[]>>
  return getDict(dictType)
}

/**
 * 获取字典映射表
 * @param dictType 字典名
 * @returns 以字典值为键 字典为值的一个map
 */
export async function getDictMap(dictType: string): Promise<Recordable<DictType>> {
  const dict = await getDict(dictType)

  return dict.reduce((prev, current) => {
    const { dictValue } = current
    prev[dictValue] = current
    return prev
  }, {} as Recordable<DictType>)
}
