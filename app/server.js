const https = require('https')
const cert = require('./cert.js')

await cert.run()

https.createServer(cert.value, (req, res) => {
    res.writeHead(200)
    res.end('hello world\n')
}).listen(80)