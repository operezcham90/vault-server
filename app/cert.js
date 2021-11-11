'use strict'

const fs = require('fs')
const os = require('os');
const cp = require("child_process")

const ip = {
    value: '',
    build: () => {
        console.log(os.networkInterfaces())
    }
}

const req = {
    text: '',
    erase: () => {
        req.text = ''
    },
    section: (name) => {
        req.text += '[' + name + ']\n'
    },
    property: (name, value) => {
        req.text += name + ' = ' + value + '\n'
    },
    build: () => {
        req.erase()
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
        const err = await fs.promises.writeFile('./req', req.text)
        if (err) {
            console.error(err)
        }
    }
}

req.write()