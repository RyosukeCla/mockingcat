const chokidar = require('chokidar')
const config = require('./lib/config')
const Mockingbird = require('./lib/index')
const chalk = require('chalk')

const watcher = chokidar.watch(config.default.srcDir, {
  ignored: /(^|[\/\\])\../,
  ignoreInitial: true
})

let server = new Mockingbird.default()
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
