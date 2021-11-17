'use strict'

class MainController {
    async root({ view }) {
        return { alive: true }
    }
}

module.exports = MainController