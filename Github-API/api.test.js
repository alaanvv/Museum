const axios = require('axios')

// USERS
test('Endpoint "/api/users" must return a list with users and a URL for next page', async () => {
  const res = await axios.get('http://localhost:404/api/users')

  expect(Object.keys(res.data)).toContain('nextPage')
  expect(Object.keys(res.data)).toContain('users')
})

// DETAILS
test('Endpoint "/api/users/alaanvv/details" must return a details for my account', async () => {
  const res = await axios.get('http://localhost:404/api/users/alaanvv/details')

  expect(Object.keys(res.data)).toContain('login')
})

test('Endpoint "/api/users/THIS_USER_DONT_EXIST/details" must return a error message', async () => {
  const res = await axios.get('http://localhost:404/api/users/THIS_USER_DONT_EXIST/details')

  expect(typeof res.data).toBe('string')
})

// REPOS
test('Endpoint "/api/users/alaanvv/repos" must return repos of my account', async () => {
  const res = await axios.get('http://localhost:404/api/users/alaanvv/repos')

  expect(Array.isArray(res.data)).toBeTruthy()
})

test('Endpoint "/api/users/THIS_USER_DONT_EXIST/repos" must return a error message', async () => {
  const res = await axios.get('http://localhost:404/api/users/THIS_USER_DONT_EXIST/repos')

  expect(typeof res.data).toBe('string')
})
