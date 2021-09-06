import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import legacy from '@vitejs/plugin-legacy'
import { configMockPlugin } from './mock'
// import { configStyleImportPlugin } from './styleImport'

// import { configImageminPlugin } from './imagemin'
import { configCompressPlugin } from './compress'

import viteComponents from 'vite-plugin-components'
import viteSvgIcons from 'vite-plugin-svg-icons'
import path from 'path'
// 解析文件夹
function pathResolve(dir: string) {
  return path.resolve(__dirname, dir)
}

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    // VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv

  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    vueJsx(),
    // setup增强
    vueSetupExtend(),
    viteComponents({
      // TODO 动态加载 组件
      // globalComponentsDeclaration: pathResolve('../../../types/components.d.ts'),
      // customComponentResolvers: [AntDesignVueResolver()],
    }),
    viteSvgIcons({
      iconDirs: [pathResolve('../../../src/assets/icons')],
      symbolId: 'svg-[name]',
    }),
  ]

  // 针对传统浏览器的支持
  VITE_LEGACY && isBuild && vitePlugins.push(legacy())

  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  // vite-plugin-style-import
  // vitePlugins.push(configStyleImportPlugin(isBuild))

  if (isBuild) {
    //vite-plugin-imagemin 这鬼玩意依赖的包国内不好下载下来
    // VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin())
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    )
  }

  return vitePlugins
}
