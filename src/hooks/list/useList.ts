import { TableState } from 'ant-design-vue/lib/table/interface'

import { computed, reactive, toRaw, onMounted, ComputedRef, Ref } from 'vue'
import * as config from '@/settings/pagination.conf'
import { useRequest } from '../request/useRequest'

export type QueryAction = (params: QueryParams) => Promise<Result>

export type ListProps = {
  params?: QueryParams
  action: QueryAction
}

type Pagination = TableState['pagination']

export type ListResult = {
  pagination: ComputedRef<Pagination>
  dataSource: ComputedRef<unknown[]>
  loading: Ref<boolean>
  handleSearch: (page?: number) => void
}

export const useList = (props: ListProps): ListResult => {
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
  } = useRequest<PaginationList>(props.action, toRaw(searchQuery.value), { rows: [], total: 0 }, (result: Result) => {
    return result.data as PaginationList
  })

  onMounted(() => {
    handleSearch()
  })

  // 分页事件
  const handlePaginationChange = (page: number, pageSize: number) => {
    paginationModel.current = page
    paginationModel.pageSize = pageSize
    handleSearch()
  }

  // 分页参数
  const pagination = computed((): Pagination => {
    return {
      ...toRaw(paginationModel),
      total: result.value.total,
      pageSizeOptions: config.defaultPageSizeOptions,
      showSizeChanger: true,
      showTotal: config.showTotal,
      onChange: handlePaginationChange,
      onShowSizeChange: handlePaginationChange,
    }
  })

  /**
   * 查询
   * @param page 当前页码
   */
  const handleSearch = async (page?: number) => {
    if (page) {
      paginationModel.current = page
    }
    search(toRaw(searchQuery.value))
  }

  const dataSource = computed(() => result.value.rows)

  return { pagination, dataSource, loading, handleSearch }
}
