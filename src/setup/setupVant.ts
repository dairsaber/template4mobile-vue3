import { App } from 'vue'
import Vant from 'vant'

export const setupVant = (app: App<Element>) => {
  app.use(Vant)
}
