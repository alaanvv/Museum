const axios = require('axios')

module.exports = async (req, res) => {
  const apiUrl = 'https://api.github.com/users/'
  const username = req.params.username

  try { 
    const details = await axios.get(apiUrl + username + '/repos')
    res.send(details.data)
  }
  catch (err) { res.send('An error ocurred') }
} 