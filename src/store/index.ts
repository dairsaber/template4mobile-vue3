import { createPinia, Pinia } from 'pinia'
import { App } from '@vue/runtime-core'

export const store: Pinia = createPinia()

export const setupStore = (app: App<Element>) => {
  app.use(store)
}
