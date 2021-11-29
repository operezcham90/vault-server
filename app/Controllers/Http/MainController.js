'use strict'

class MainController {
    async alive({ view }) {
        return { alive: true, well: 'yes' }
    }
}

module.exports = MainController