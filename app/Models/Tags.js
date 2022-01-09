'use strict'

class Tags {
    static parse(tags) {
        const alphanum = tags.replace(/[^\w\d ]/g, ' ')
        const lower = alphanum.toLowerCase()
        const cut = lower.trim()
        const words = cut.split(/\s+/g)
        const order = words.sort()
        const unique = new Set(order)
        const array = Array.from(unique)
        return array
    }
}

module.exports = Tags
