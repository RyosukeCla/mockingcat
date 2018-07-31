import * as fastify from 'fastify'

export interface Config {
  srcDir: string
  baseUrl: string
  port: number
  verbose: boolean,
  middlewares: fastify.Middleware<any, any, any>[],
  ignore: RegExp[]
}

export const defaultConfig: Config = {
  srcDir: 'mock',
  baseUrl: '/mock',
  port: 8090,
  verbose: true,
  middlewares: [],
  ignore: [/node_modules/]
}

export const mergeConfig = (config: Config): Config => {
  return { ...defaultConfig, ...config }
}
