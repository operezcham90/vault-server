'use strict'

class MainController {
    async root() {
        return {
            alive: true,
            well: 'no',
            fine: '👍'
        }
    }
}

module.exports = MainController