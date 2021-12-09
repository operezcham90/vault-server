'use strict'

const { Ignitor } = require('@adonisjs/ignitor')
const https = require('https')
const fs = require('fs')

const options = {
  key: fs.readFileSync('./localhost.key'),
  cert: fs.readFileSync('./localhost.crt')
}

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer((handler) => {
    return https.createServer(options, handler)
  })
  .catch(console.error)
