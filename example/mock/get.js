module.exports = {
  method: 'POST',
  schema: {
    body: {
      type: 'object',
      properties: {
        who: {
          type: 'string'
        }
      },
      required: ['who']
    }
  },
  handler (req, rep) {
    const { who } = req.body
    rep.send({ message: `hello, ${who}!` })
  }
}
