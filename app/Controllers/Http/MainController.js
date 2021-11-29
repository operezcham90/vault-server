'use strict'

class MainController {
    async root() {
        return {
            alive: true,
            well: 'yes'
        }
    }
}

module.exports = MainController