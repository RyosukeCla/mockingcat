# Mockingcat
> lightweight mock server based on fastify

## Getting started
### #1 setup
install mockingcat (or use npx)
```
$ npm i -g mockingcat
# or
$ npm i -D mockingcat
```

make `mock` dir to project path
```
$ mkdir mock
```

### #2 start mockingcat
```
$ mockingcat
# or
$ npx mockingcat
```

### #3 make mock api - 1
make file `mock/get.js`
```
$ touch mock/get.js
```

now, you can access to mock/get
```
$ curl http://localhost:8090/mock/get
> {"message":"not implemented yet"}
```

next, implement `mock/get.js`
```js
module.exports = {
  method: 'GET',
  handler (request, reply) {
    reply.send({ message: 'hello, world!' })
  }
}
```

access to mock/get
```
$ curl http://localhost:8090/mock/get
> {"message":"hello, world!"}
```

### #4 make mock api - 2
next, make `mock/user/_id.js`, and append this
```js
module.exports = {
  method: 'GET',
  handler (request, reply) {
    reply.send(request.params)
  }
}
```

you can access to mock/user/_id
```
$ curl http://localhost:8090/mock/user/hello
> {"id": "hello"}
```

## Detail
### config (default)
`mockingcat.config.js`
```js
module.exports = {
  port: 8090,
  srcDir: './mock',
  baseUrl: '/mock',
  verbose: true
}
```

### mock file (default)
```js
module.exports = {
  method: 'GET',
  url: baseUrl + mockFilepath
  handler (request, reply) {
    reply.send({ message: 'not implemented yet' })
  }
}
```
you can define mock file as fastify route option.
[more detail.](https://github.com/fastify/fastify/blob/master/docs/Routes.md#full-declaration)

### CLI
```
$ mockingcat --help

Mockingcat
  --help     (-h)
  --version  (-v)
  --port     (-p) : 8090
  --srcdir   (-s) : ./mock
  --baseurl  (-b) : /mock
  --verbose  (-v) : true
```
