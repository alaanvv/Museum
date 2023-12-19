const Router = require('express').Router
const userController = require('./src/controller/user')
const userDetailsController = require('./src/controller/userDetails')
const userReposController = require('./src/controller/userRepos')

const router = new Router()

router.get('/api/users', userController)
router.get('/api/users/:username/details', userDetailsController)
router.get('/api/users/:username/repos', userReposController)

module.exports = router