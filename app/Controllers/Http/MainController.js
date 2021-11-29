'use strict'

class MainController {
    async alive({ view }) {
        return { alive: true }
    }
}

module.exports = MainController