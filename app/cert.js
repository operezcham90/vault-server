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
        req.property('C', 'MX')
        req.property('S', 'San Luis Potosi')
        req.property('L', 'San Luis Potosi')
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
        const err = await fs.promises.writeFile(os.homedir() + '/vault/domain.req', req.text)
        if (err) {
            console.error(err)
        }
    }
}

const cert = {
    command: 'openssl',
    arguments: [
        'req',
        '-new',
        '-nodes',
        '-x509',
        '-days', '365',
        '-keyout', os.homedir() + '/vault/domain.key',
        '-out', os.homedir() + '/vault/domain.cer',
        '-sha256',
        '-config', os.homedir() + '/vault/domain.req'
    ],
    value: {
        key: '',
        cert: ''
    },
    run: async () => {
        await req.write()
        const res = await util.promisify(cp.execFile)(cert.command, cert.arguments)
        console.log(res)
        cert.value.cert = await fs.promises.readFile(os.homedir() + '/vault/domain.cer')
        cert.value.key = await fs.promises.readFile(os.homedir() + '/vault/domain.key')
    }
}

module.exports = cert