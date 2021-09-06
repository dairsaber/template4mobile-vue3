import { ref, Ref, UnwrapRef, toRaw, watch } from 'vue'

type SearchBarHook<T> = {
  handleReset: Fn<void, void>
  handleSearch: Fn<void, void>
  paramsRef: Ref<UnwrapRef<Partial<T> & QueryParams>>
}
export type EmitEvent = (event: 'update:params' | 'search' | 'reset', ...args: any[]) => void

export const useSearchBar = <T>(emit: EmitEvent, props: { params: QueryParams }): SearchBarHook<T> => {
  // 定义事件
  const paramsRef = ref<Partial<T> & QueryParams>({})

  watch(
    () => props.params,
    (val) => {
      paramsRef.value = val
    },
    {
      immediate: true,
    }
  )

  const updateParams = () => {
    emit('update:params', toRaw(paramsRef.value))
  }
  const handleSearch = () => {
    updateParams()
    emit('search')
  }
  const handleReset = () => {
    updateParams()
    emit('reset')
  }

  return { handleReset, handleSearch, paramsRef }
}
