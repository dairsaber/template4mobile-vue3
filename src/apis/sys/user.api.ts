import { request } from '@/utils/http'
import { LoginParams, LoginResultModel, GetUserInfoModel, GetCaptchaImageModel } from './model/user.model'

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getInfo',
  GetCaptchaImage = '/captchaImage',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams): PromiseResult<LoginResultModel> {
  return request.post<Result<LoginResultModel>>({
    url: Api.Login,
    params,
  })
}

/**
 * @description: getUserInfo
 */
export function getUserInfo(): PromiseResult<GetUserInfoModel> {
  return request.get<Result<GetUserInfoModel>>({ url: Api.GetUserInfo })
}

export function getCaptchaImage(): PromiseResult<GetCaptchaImageModel> {
  return request.get<Result<GetCaptchaImageModel>>({ url: Api.GetCaptchaImage })
}

export function doLogout(): Promise<void> {
  return request.get({ url: Api.Logout })
}
