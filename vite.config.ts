import { defineConfig, UserConfigExport, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { createProxy } from './build/vite/proxy'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'
import path from 'path'
import { OUTPUT_DIR } from './build/constant'

// 解析文件夹
function pathResolve(dir: string) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default ({ mode, command }: ConfigEnv): UserConfigExport => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const isBuild = command === 'build'
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv
  return defineConfig({
    resolve: {
      alias: [
        {
          find: '@',
          replacement: pathResolve('src'),
        },
        {
          find: '#',
          replacement: pathResolve('types'),
        },
      ],
    },
    server: {
      base: VITE_PUBLIC_PATH,
      host: true,
      port: VITE_PORT ?? 3000,
      proxy: createProxy(VITE_PROXY),
      fs: {
        // 开发环境不需要严格控制
        strict: false,
      },
    },
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // 在生产环境删除console
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      // 关闭 brotliSize 可略微提升打包时间
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    optimizeDeps: {
      include: [],
      exclude: ['vue-demi'],
    },
  })
}
