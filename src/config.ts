import * as fs from 'fs'
import * as path from 'path'
import * as appRootPath from 'app-root-path'

export interface Config {
  srcDir: string
  baseUrl: string
  port: number
  verbose: boolean
}

const defaultConfig: Config = {
  srcDir: 'mock',
  baseUrl: '/mock',
  port: 8090,
  verbose: true
}

const CONFIG_PATH = './mockingcat.config.js'

const configLoader = (): Config => {
  const isExist = fs.existsSync(CONFIG_PATH)
  if (isExist) {
    const configPath = path.resolve(CONFIG_PATH) //= path.resolve(appRootPath.path, CONFIG_PATH)
    return require(configPath) as Config
  } else {
    return defaultConfig
  }
}

const mergeConfig = (config: Config) => {
  return { ...defaultConfig, ...config }
}

export default mergeConfig(configLoader())
