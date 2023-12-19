const axios = require('axios')

module.exports = async (req, res) => {
  const apiUrl = 'http://api.github.com/users?since='
  const since = Number(req.query.since) || 0

  const users = await axios.get(apiUrl + since)
  const lastUserId = users.data[users.data.length - 1].id
  const data = {
    nextPage: `${req.protocol}://${req.headers.host}/api/users?since=${lastUserId}`,
    users: users.data
  }

  res.send(data)
}