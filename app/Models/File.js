'use strict'

const Tags = use('App/Models/Tags')
const fs = use('fs')
const crypto = use('crypto')

class File {
    async store(file, tags) {
        const words = Tags.parse(tags)
        const hash = crypto.createHash('sha256')
        const buff = await fs.promises.readFile(file.tmpPath)
        hash.update(buff)
        const id = hash.digest('hex')
        const path = '/home/serv/uploads/' + id
        const exists = await fs.promises.exists(path)
        if (!exists) {
            await fs.promises.mkdir(path)
            await fs.promises.writeFile(path + '/t.txt', words.join(' '))
            await fs.promises.rename(file.tmpPath, path + '/f.' + file.extname)
        }
    }
    async search(tags) {
        const words = Tags.parse(tags)
        const path = '/home/serv/uploads'
        const ids = await fs.promises.readdir(path)
        const files = []
        for (const id of ids) {
            const t = await fs.promises.readFile(path + '/' + id + '/t.txt', 'utf8')
            const file = {
                id: id,
                tags: t
            }
            let matches = 0
            for (const word of words) {
                if (file.tags.indexOf(word) >= 0) {
                    matches++
                }
            }
            if (matches > 0) {
                files.push(file)
            }
            return files
        }
    }
}

module.exports = File
