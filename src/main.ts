import '@/styles/index.scss'

import { createApp } from 'vue'
import App from './App.vue'
// 加入svg图标支持
import 'vite-plugin-svg-icons/register'
import '@/permission'
import { setup } from '@/setup'

const app = createApp(App)
setup(app)

app.mount('#app')
