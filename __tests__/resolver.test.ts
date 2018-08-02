import resolver from '../src/resolver'

test('resolver: should resolve all files', () => {
  const files = resolver('./example/mock/')
  const expectedFiles = [
    'example/mock/get.js',
    'example/mock/rest.js',
    'example/mock/get.js',
  ]

  expectedFiles.forEach((file) => {
    expect(files.indexOf(file)).toBeGreaterThanOrEqual(0)
  })
})
