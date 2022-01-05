'use strict'

class Tags {
    static parse(tags) {
        let words = tags.toLowerCase()
        words = words.replace(/[^\w\d ]/g, ' ')
        words = words.split(' ')
        words = [...new Set(words)]
        return words.sort()
    }
}

module.exports = Tags
