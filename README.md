# Mockingbird
> fastify-based mock server

# Getting started
## #1 make mock dir
```
mkdir mock
```

## #2 start mockingbird
```
$ mockingbird
```

## #3 make mock api
make file `mock/get.js`
and append below
```js
module.exports = {}
```

## #4 curl mock/get
```
$ curl http://localhost:3000/mock/get
> {"message":"not implemented yet"}
```

## #5 implement mock/get
```js
module.exports = {
  method: 'GET',
  handler (request, reply) {
    reply.send({ message: 'hello, world!' })
  }
}
```

## #6 curl mock/get
```
$ curl http://localhost:3000/mock/get
> {"message":"hello, world!"}
```
