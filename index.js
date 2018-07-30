const chokidar = require('chokidar')
const config = require('./lib/config')
const Mockingcat = require('./lib/index')
const chalk = require('chalk')
const minimist = require('minimist')
const packagejson = require('./package.json')

const argv = minimist(process.argv.splice(2))
if (argv.version || argv.v) {
  console.log(packagejson.version)
  process.exit(0)
}
if (argv.help || argv.h) {
  console.log(`
Mockingcat
  --help     (-h)
  --version  (-v)
  --port     (-p) : 8090
  --srcdir   (-s) : ./mock
  --baseurl  (-b) : /mock
  --verbose  (-v) : true
  `)
  process.exit(0)
}

const watcher = chokidar.watch(config.default.srcDir, {
  ignored: /(^|[\/\\])\../,
  ignoreInitial: true
})

let server = new Mockingcat.default()
try {
  server.start()
} catch (e) {
  console.clear()
  console.log(chalk.bgRed(' Error '), e)
}

process.on('unhandledRejection', e => {
  console.clear()
  console.log(chalk.bgRed(' Error '), e)
})

watcher.on('all', () => {
  console.log('asjfoasjf')
  try {
    if (server) {
      server.stop(() => {
        try {
          server.reset()
          server.start()
        } catch (e) {
          console.clear()
          console.log(chalk.bgRed(' Error '))
          console.error(e)
        }
      })
    }
  } catch (e) {
    console.clear()
    console.log(chalk.bgRed(' Error '))
    console.error(e)
  }
})
