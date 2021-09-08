import { ApplyPlan } from './model/apply.model'
import { request } from '@/utils/http'

// 申报计划
enum Api {
  getApplyPlans = '/apply/plan/list',
}

/**
 * 获取申报计划列表
 * @param params 查询条件
 * @returns
 */
export async function getApplyPlans(params: QueryParams): PromisePaginationResult<ApplyPlan> {
  return request.get<PaginationResult<ApplyPlan>>({
    url: Api.getApplyPlans,
    params,
  })
}
