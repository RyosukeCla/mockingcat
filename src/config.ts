import * as fs from 'fs'
import * as path from 'path'
import * as minimist from 'minimist'

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

const argv = minimist(process.argv.slice(2))
const argvConfig: any = {}
if (argv.srcdir || argv.s) argvConfig.srcDir = argv.srcdir || argv.s
if (argv.baseurl || argv.b) argvConfig.baseUrl = argv.baseurl || argv.b
if (argv.port || argv.p) argvConfig.port = argv.port || argv.p
if (argv.verbose || argv.v) argvConfig.verbose = JSON.parse(argv.verbose || argv.v)

const CONFIG_PATH = './mockingcat.config.js'

const configLoader = (): Config => {
  const isExist = fs.existsSync(CONFIG_PATH)
  if (isExist) {
    const configPath = path.resolve(CONFIG_PATH)
    return require(configPath) as Config
  } else {
    return defaultConfig
  }
}

const mergeConfig = (config: Config) => {
  return { ...defaultConfig, ...config, ...argvConfig } as Config
}

export default mergeConfig(configLoader())
