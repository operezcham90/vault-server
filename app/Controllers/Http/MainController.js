'use strict'

const fs = use('fs')

class MainController {
    async alive() {
        return {
            alive: true
        }
    }
    async csrf({ request }) {
        return {
            token: request.csrfToken
        }
    }
}

module.exports = MainController