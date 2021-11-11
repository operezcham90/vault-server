const https = require('https')
const cert = require('./cert.js')

const start = async () => {
    await cert.run()
    console.log(cert.value)
    https.createServer(cert.value, (req, res) => {
        res.writeHead(200)
        res.end('hello world\n')
    }).listen(80)
}

start()