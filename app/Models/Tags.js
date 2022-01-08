'use strict'

class Tags {
    static parse(tags) {
        let words = tags.toLowerCase()
        words = words.trim()
        words = words.replace(/[^\w\d_ ]/g, ' ')
        words = words.split(' ')
        words = [...new Set(words)]
        if (words[0] === '') {
            words.shift()
        }
        return words.sort()
    }
}

module.exports = Tags
