import Cookies from 'js-cookie'
import { getAppEnvConfig } from './env'

const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig()
const tokenKey = VITE_GLOB_APP_SHORT_NAME + '_token'

export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string) => Cookies.set(tokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)
