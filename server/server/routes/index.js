const express = require('express')
const email = express.Router()
const Email = require('../model/email')
const log = console.log.bind(console)

email.post('/email', async (request, response) => {
  const { body } = request
  try {
    await Email.save(body);
    response.status(200)
    response.send('Saved!')
  } catch (error) {
    response.status(500)
  }
})

email.get('/email', async (request, response) => {
  try {
    const r = await Email.fetchList();
    response.status(200)
    response.send(r)
  } catch (error) {
    response.status(500)
    response.send(error)
  }
})

module.exports = email