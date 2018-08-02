module.exports = [{
  method: 'GET',
  handler (req, rep) {
    rep.send('GET')
  }
}, {
  method: 'POST',
  hander (req, rep) {
    rep.send('POST')
  }
}, {
  method: 'PUT',
  hander (req, rep) {
    rep.send('PUT')
  }
}, {
  method: 'PATCH',
  hander (req, rep) {
    rep.send('PATCH')
  }
}, {
  method: 'DELETE',
  hander (req, rep) {
    rep.send('DELETE')
  }
}]
