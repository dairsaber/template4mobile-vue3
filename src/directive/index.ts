import type { App } from 'vue'
import { hasPermi } from './hasPermission.v'
// 注册全局指令
export function setDirective(app: App<Element>) {
  app.directive('hasPermi', hasPermi)
}
