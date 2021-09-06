import { request } from '@/utils/http'
import { RemoteRoute } from './model/remoteRoute.model'
enum Api {
  GetRoutes = '/getRouters',
}

// 获取路由配置
export const getRoutesList = (): PromiseResult<RemoteRoute[]> => {
  return request.get<Result<RemoteRoute[]>>({
    url: Api.GetRoutes,
  })
}
