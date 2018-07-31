const users = [
  { id: 'Ryosuke', github: '@RyoskeCla' }
]

module.exports = {
  handler (req, rep) {
    const { id } = req.params
    const user = users.find((_user) => _user.id === id)

    if (user) {
      return rep.send({ user })
    } else {
      return rep.status(404).send({ message: 'Not found', status: 404 })
    }
  }
}
