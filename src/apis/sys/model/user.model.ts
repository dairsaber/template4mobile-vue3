/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string
  password: string
  code: string
  uuid: string
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  code: number
  token: string
  msg: string
  role: string[]
}

export type UserModel = {
  // 用户id
  userId: string | number
  // 用户名
  userName: string
  // 头像
  avatar?: string
  // 昵称
  nickName: string

  phonenumber: string

  email: string

  permissions?: string[]
  // 后面在补充
}
/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: string[]
  user: UserModel
}

export type GetCaptchaImageModel = { img: string; code: number; uuid: string }
