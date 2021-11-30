'use strict'

const fs = use('fs')

class MainController {
    async alive() {
        return {
            alive: true
        }
    }
    async icon({ response }) {
        response.status(204)
    }
}

module.exports = MainController