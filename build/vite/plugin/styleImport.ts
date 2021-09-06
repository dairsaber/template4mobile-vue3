/**
 *  Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */
import styleImport from 'vite-plugin-style-import'

export function configStyleImportPlugin() {
  const styleImportPlugin = styleImport({
    libs: [
      {
        libraryName: 'vant',
        esModule: true,
        resolveStyle: (name: string) => `vant/es/${name}/style`,
      },
    ],
  })
  return styleImportPlugin
}
