// Read all environment variable configuration files to process.env
export type RealNameType = string | number | boolean

export function wrapperEnv(envConf: Recordable<string | boolean>): ViteEnv {
  const ret: Recordable<RealNameType> = {}

  for (const envName of Object.keys(envConf)) {
    let realName: RealNameType = (envConf[envName] as string).replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName as string)
      } catch (error) {
        console.error(`error`, error)
      }
    }
    ret[envName] = realName
    if (typeof realName === 'string') {
      process.env[envName] = realName
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName)
    }
  }
  return ret as unknown as ViteEnv
}
