'use strict'

const { Ignitor, hooks } = require('@adonisjs/ignitor')
const https = require('https')
const fs = require('fs')

hooks.before.httpServer(() => {
  var options = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt'),
  }
  return https.createServer(options)
})

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer()
  .catch(console.error)
