'use strict'

const fs = require('fs')
const os = require('os')
const cp = require('child_process')
const util = require('util')

const ip = {
    value: '',
    build: () => {
        const nets = os.networkInterfaces()
        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                if (net.family === 'IPv4' && !net.internal) {
                    ip.value = net.address
                }
            }
        }
    }
}

const req = {
    text: '',
    section: (name) => {
        req.text += '[' + name + ']\n'
    },
    property: (name, value) => {
        req.text += name + ' = ' + value + '\n'
    },
    build: () => {
        req.section('req')
        req.property('default_bit', 4096)
        req.property('default_md', 'sha256')
        req.property('distinguished_name', 'req_distinguished_name')
        req.property('x509_extensions', 'v3_req')
        req.property('prompt', 'no')
        req.section('req_distinguished_name')
        req.property('O', 'Home')
        req.property('OU', 'Storage')
        req.property('CN', ip.value)
        req.section('v3_req')
        req.property('keyUsage', 'keyEncipherment, dataEncipherment')
        req.property('extendedKeyUsage', 'serverAuth')
        req.property('subjectAltName', '@alt_names')
        req.section('alt_names')
        req.property('IP.1', ip.value)
    },
    write: async () => {
        ip.build()
        req.build()
        const err = await fs.promises.writeFile('./temp/req', req.text)
        if (err) {
            console.error(err)
        }
    }
}

const cert = {
    command: 'openssl',
    arguments: [
        'req', '-new', '-nodes', '-x509', '-days', '365', '-keyout',
        './temp/domain.key', '-out', '.temp/domain.crt', '-config', './temp/req'
    ],
    value: {
        key: '',
        cert: ''
    },
    run: async () => {
        await req.write()
        const res = await util.promisify(cp.execFile)(cert.command, cert.arguments)
        if (res.stderr) {
            console.error(res.stderr)
            return
        }
        cert.value.cert = await fs.promises.readFileSync('./temp/domain.cert')
        cert.value.key = await fs.promises.readFileSync('./temp/domain.key')
    }
}

module.export = cert