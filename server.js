'use strict'

const { Ignitor } = require('@adonisjs/ignitor')
const https = require('https')
const fs = require('fs')

/*new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer()
  .catch(console.error)*/

new Ignitor(__dirname).httpServer().start((handle) => {
  return https.createServer({
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt'),
  },
    handle
  );
});
