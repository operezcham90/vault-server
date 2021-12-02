'use strict'

const fs = use('fs')

class MainController {
    async alive() {
        return {
            alive: true
        }
    }
}

module.exports = MainController