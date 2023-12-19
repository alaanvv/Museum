const express = require('express')
const cors = require('cors')
const router = require('./router')

const app = express()
const port = 404 // If you change this and want to use npm test, change "api.test.js" port too

app.use(cors())
app.use(router)
app.use((req, res) => {res.status(404).send('404')}) // Need to be the last middleware

app.listen(port, () => console.log(`Running on http://localhost:${port}`))