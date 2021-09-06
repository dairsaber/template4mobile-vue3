import { UserModel } from './model/user.model'
import { request } from '@/utils/http'

// 用户管理
enum Api {
  getUsers = '/system/user/list',
}

export interface GetUsersParams extends QueryParams {
  name: string
}

export async function getUsers(params: GetUsersParams): PromisePaginationResult<UserModel> {
  return request.get<PaginationResult<UserModel>>({
    url: Api.getUsers,
    params,
  })
}
