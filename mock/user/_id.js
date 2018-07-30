module.exports = {
  method: 'GET',
  handler (request, reply) {
    const params = request.params
    reply.send(params)
  }
}
