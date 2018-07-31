module.exports = {
  handler (req, rep) {
    rep.send({ message: 'hello, world!' })
  }
}
