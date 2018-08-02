import { Config, mergeConfig, defaultConfig } from '../src/config'

test('config: should mergeConfig return default config', () => {
  const mergedConfig = mergeConfig({} as Config)
  expect(mergedConfig).toEqual(defaultConfig)
})

test('config: should mergeConfig return merged config', () => {
  const overrideConfig: Config = {
    port: 3000,
    srcDir: './mock',
    baseUrl: '/api',
    verbose: false,
    middlewares: [],
    ignore: [/test/]
  }

  const mergedConfig = mergeConfig(overrideConfig)
  expect(mergedConfig).toEqual(overrideConfig)
})
