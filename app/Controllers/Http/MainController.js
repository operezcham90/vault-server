'use strict'

const fs = use('fs')

class MainController {
    async alive() {
        return {
            alive: true
        }
    }
    async icon({ response }) {
        response.safeHeader('Content-type', 'image/x-icon')
        return await fs.promises.readFile('./resources/favicon.ico')
    }
}

module.exports = MainController