import { isDevMode } from '@/utils/env'
const projectName = import.meta.env.VITE_GLOB_APP_TITLE

export function warn(message: string): void {
  console.warn(`[${projectName} warn]:${message}`)
}

export function error(message: string): void {
  throw new Error(`[${projectName} error]:${message}`)
}

/**
 * 调试时打印的前端信息 只在开发环境才生效
 * @param params 要打印到控制台的变量什么的
 */
export function debugLog(...params: unknown[]): void {
  if (isDevMode()) {
    console.log(...params)
  }
}
