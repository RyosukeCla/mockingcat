module.exports = {
  method: 'GET',
  handler (request, reply) {
    reply.send({ message: 'hello, world!' })
  }
}
