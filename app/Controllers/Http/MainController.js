'use strict'

class MainController {
    async root() {
        return {
            alive: true,
            well: 'no'
        }
    }
}

module.exports = MainController