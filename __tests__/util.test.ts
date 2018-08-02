import * as util from '../src/util'

test('util: processFilename', () => {
  const processed = util.processFilename('example/mock/user/_uid/post/_pid.js', './example/mock', '/api')
  expect(processed).toBe('/api/user/:uid/post/:pid')
})

test('util: leftPath', () => {
  const padded = util.leftPad('TEST', 7)
  expect(padded).toBe('TEST   ')
})
