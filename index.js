const minimist = require('minimist')
const fs = require('fs')
const path = require('path')
const argv = minimist(process.argv.splice(2))
const packagejson = require('./package.json')

// version
if (argv.version || argv.v) {
  console.log(`version - ${packagejson.version}`)
  process.exit(0)
}

// help
if (argv.help || argv.h) {
  const help =
`Mockingcat CLI - v${packagejson.version}

  eg) $ mockingcat -p 3000

  --help     (-h)
  --version  (-v)
  --port     (-p) : 8090
  --srcdir   (-s) : ./mock
  --baseurl  (-b) : /mock
  --verbose  (-v) : true
`
  console.log(help)
  process.exit(0)
}

// config with cli
const argvConfig = {}
if (argv.srcdir || argv.s) argvConfig.srcDir = argv.srcdir || argv.s
if (argv.baseurl || argv.b) argvConfig.baseUrl = argv.baseurl || argv.b
if (argv.port || argv.p) argvConfig.port = argv.port || argv.p
if (argv.verbose || argv.v) argvConfig.verbose = JSON.parse(argv.verbose || argv.v)

const loadConfig = () => {
  const CONFIG_PATH = './mockingcat.config.js'

  const isExist = fs.existsSync(CONFIG_PATH)
  if (isExist) {
    const configPath = path.resolve(CONFIG_PATH)
    return require(configPath)
  } else {
    return {}
  }
}

const loadedConfig = loadConfig()
const mockingcatConfig = {
  ...loadedConfig, ...argvConfig
}

// start mockingcat
const { logError } = require('./lib/util')
process.on('uncaughtException', (e) => {
  logError(e)
})

const Mockingcat = require('./lib/index')
const mockingcat = new Mockingcat.default(mockingcatConfig)
mockingcat.start()
