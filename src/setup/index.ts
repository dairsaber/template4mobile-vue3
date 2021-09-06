import { setupRouter } from '@/route'
import { setupStore } from '@/store'
import { setDirective } from '@/directive'
import { setupVant } from './setupVant'
import { setupComponents } from './setupComponent'

import type { App } from 'vue'

export const setup = (app: App<Element>): void => {
  setupRouter(app)
  setupStore(app)
  setDirective(app)
  setupComponents(app)
  setupVant(app)
}
