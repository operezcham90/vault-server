'use strict'

class MainController {
    async root({ view }) {
        return view.render('root')
    }
}

module.exports = MainController