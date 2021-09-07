import BaseIcon from '@/components/base-icon/BaseIcon.vue'
import GlobalHeader from '@/components/global-header/GlobalHeader.vue'
import GoTo from '@/components/go-to/GoTo.vue'

import { App } from 'vue'

export const setupComponents = (app: App<Element>) => {
  // 注册全局组件
  app.component(BaseIcon.name ?? 'BaseIcon', BaseIcon)
  app.component(GoTo.name ?? 'GoTo', GoTo)
  app.component(GlobalHeader.name ?? 'GlobalHeader', GlobalHeader)
}
