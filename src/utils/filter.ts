import { isNullOrUnDef, isObject, isString } from '@/utils/is'
export function filterNoNull(params: Recordable): Nullable<Recordable>

export function filterNoNull(params: SimpleType): SimpleType

/**
 * 过滤undefined 和 null的对象
 * @param params
 * @returns
 */
export function filterNoNull(params: Recordable | SimpleType): Nullable<Recordable | SimpleType> {
  if (isObject(params)) {
    return Object.keys(params).reduce((prev: Recordable, current) => {
      const currentValue = params[current]
      if (isNullOrUnDef(currentValue)) return prev
      if (isString(currentValue) && currentValue.trim() === '') return prev
      prev[current] = currentValue
      return prev
    }, {})
  }

  return params
}
