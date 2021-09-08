import { computed, reactive, toRaw, onMounted, ComputedRef, Ref, ref, watch } from 'vue'
import * as config from '@/settings/pagination.conf'
import { useRequest } from '../request/useRequest'

export type QueryAction = (params: QueryParams) => Promise<Result>

export type ListProps = {
  params?: QueryParams
  action: QueryAction
}

type Pagination = {
  current: number
  pageSize: number
  total: number
}

export type ListResult = {
  pagination: ComputedRef<Pagination>
  list: Ref<unknown[]>
  loading: Ref<boolean>
  finished: ComputedRef<boolean>
  handleSearch: (reset?: boolean) => Promise<void>
}

export const useList = (props: ListProps): ListResult => {
  const list = ref<unknown[]>([])
  const isFirst = ref(true)
  const paginationModel = reactive({
    current: 1,
    pageSize: config.defaultPagesize,
  })

  const searchQuery = computed(() => {
    return {
      ...props.params,
      pageNum: paginationModel.current,
      pageSize: paginationModel.pageSize,
    }
  })

  const {
    requestHandler: search,
    loading,
    result,
  } = useRequest<PaginationList>(
    props.action,
    toRaw(searchQuery.value),
    { rows: [], total: 0 },
    (result: Result) => {
      return result.data as PaginationList
    }
  )
  /**
   * 查询
   * @param page 当前页码
   */
  const handleSearch = async (reset?: boolean) => {
    if (finished.value || loading.value) return

    if (reset) {
      paginationModel.current = 1
      list.value = []
    }

    await search(toRaw(searchQuery.value))

    paginationModel.current++
    isFirst.value = false
  }

  // 分页参数
  const pagination = computed((): Pagination => {
    return {
      ...toRaw(paginationModel),
      total: result.value.total,
    }
  })

  const finished = computed(() => {
    return (
      !isFirst.value &&
      pagination.value.current * pagination.value.pageSize >= pagination.value.total
    )
  })

  onMounted(() => {
    handleSearch()
  })

  watch(
    () => result.value.rows,
    (val) => {
      list.value.push(...toRaw(val))
    },
    {
      immediate: true,
    }
  )

  return { pagination, list, finished, loading, handleSearch }
}
