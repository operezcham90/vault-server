'use strict'

const { Ignitor } = require('@adonisjs/ignitor')
const http = require('http')
const fs = require('fs')

/*new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer()
  .catch(console.error)*/

new Ignitor(__dirname).httpServer().start((handle) => {
  return https.createServer(
    handle
  );
});
