import { ref, Ref, UnwrapRef } from 'vue'

type ResponseFormat<T> = (result: unknown) => T

type RequestReturn<T> = {
  result: Ref<UnwrapRef<T>>
  loading: Ref<boolean>
  requestHandler: (params: Recordable) => void
}

/**
 * 包装请求 返回loading什么的
 * @param action 请求函数
 * @param params 请求参数
 * @param defaultValue 初始值
 * @param formatter 格式化成想要的值  不传的话就返回原来的
 * @returns 返回格式化的值
 */
export const useRequest = <T>(action: (params: Recordable) => any, params: Recordable, defaultValue: T, formatter?: ResponseFormat<T>): RequestReturn<T> => {
  const loading = ref(false)
  const result = ref<T>(defaultValue)

  const requestHandler: RequestReturn<T>['requestHandler'] = async (params) => {
    loading.value = true
    try {
      const res = await action(params)
      result.value = formatter ? formatter(res) : res
    } catch (error) {
      console.error(error)
    }
    loading.value = false
  }

  return { result, loading, requestHandler }
}
