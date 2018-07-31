import { Config, mergeConfig } from './config'
import * as fastify from 'fastify'
import MockingcatServer from './server'
import * as chokidar from 'chokidar'
import { logError, logStart } from './util'

export default class Mockingcat {
  private server: MockingcatServer
  private wacther: chokidar.FSWatcher
  private config: Config

  constructor (config?: Config) {
    this.config = mergeConfig(config || {} as any)
    this.server = new MockingcatServer(this.config)
    this.wacther = chokidar.watch(this.config.srcDir, {
      ignored: this.config.ignore,
      ignoreInitial: true
    })
  }

  getFastifyInstance (): fastify.FastifyInstance {
    return this.server.getFastifyInstence()
  }

  start () {
    try {
      logStart()
      this.server.start()
    } catch(e) {
      logError(e)
    }

    this.wacther.on('all', async () => {
      try {
        await this.server.stop()
        logStart()
        this.server.reset()
        this.server.start()
      } catch (e) {
        logError(e)
      }
    })
  }
}
