'use strict'

const fs = use('fs')
const Env = use('Env')
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const uuid = use('uuid')
const crypto = use('crypto')

class MainController {
    alive() {
        return {
            alive: true
        }
    }
    state({ request, auth }) {
        const state = {
            email: null,
            token: request.csrfToken
        }
        if (auth.user) {
            state.email = auth.user.email
        }
        return state
    }
    async login({ auth, request, response }) {
        const { email, password } = request.all()
        try {
            await auth.attempt(email, password)
        } catch (e) {
            response.status(401)
        }
        response.redirect('/')
    }
    async logout({ auth, response }) {
        await auth.logout()
        response.redirect('/')
    }
    async signup({ request, response }) {
        const { email, password, secret } = request.all()
        if (secret === Env.get('APP_KEY')) {
            try {
                await User.create({
                    username: email,
                    email: email,
                    password: password
                })
            } catch (e) {
                response.status(401)
            }
        }
        response.redirect('/')
    }
    async dropout({ auth, request, response }) {
        const { email, password } = request.all()
        await auth.logout()
        try {
            const user = await auth.attempt(email, password)
            if (user) {
                await Token.query().where('user_id', user.id).delete()
                await user.delete()
            }
        } catch (e) {
            response.status(401)
        }
        response.redirect('/')
    }
    async reset({ auth, request, response }) {
        const { secret } = request.all()
        await auth.logout()
        if (secret === Env.get('APP_KEY')) {
            await Token.query().delete()
            await User.query().delete()
        } else {
            response.status(401)
        }
        response.redirect('/')
    }
    async upload({ auth, request, response }) {
        let uploads = request.files().uploads
        const { tags } = request.all()
        if (auth.user && uploads) {
            if (!uploads.length) {
                uploads = []
                uploads.push(request.files().uploads)
            }
            for (let i = 0; i < uploads.length; i++) {
                let words = []
                if (tags[i]) {
                    words = tags[i].toLowerCase().replace(/[^\w\d ]/g, ' ').split(' ')
                    const filter = []
                    for (let i = 0; i < words.length; i++) {
                        if (words.indexOf(words[i]) === i && words[i] !== '') {
                            filter.push(words[i])
                        }
                    }
                    words = filter.sort()
                }
                const id = uuid.v4()
                const sum = crypto.createHash('sha256')
                const buff = await fs.promises.readFile(uploads[i].tmpPath)
                sum.update(buff)
                const hex = sum.digest('hex')
                const base = '/home/serv/uploads/' + id
                await fs.promises.mkdir(base)
                await fs.promises.writeFile(base + '/d.txt', hex)
                await fs.promises.writeFile(base + '/t.txt', words.join(' '))
                await fs.promises.rename(uploads[i].tmpPath, base + '/f.' + uploads[i].extname)
            }
        } else {
            response.status(401)
        }
        response.redirect('/')
    }
    async find({ auth, request, response }) {
        let { tags } = request.all()
        if (auth.user) {
            let words = []
            if (tags) {
                words = tags.toLowerCase().replace(/[^\w\d ]/g, ' ').split(' ')
                const filter = []
                for (let i = 0; i < words.length; i++) {
                    if (words.indexOf(words[i]) === i && words[i] !== '') {
                        filter.push(words[i])
                    }
                }
                words = filter.sort()
            }
            const path = '/home/serv/uploads'
            const ids = await fs.promises.readdir(path)
            const files = ids
            /*for (const id in ids) {
                const t = await fs.promises.readFile(path + '/' + id + '/t.txt', 'utf8')
                const d = await fs.promises.readFile(path + '/' + id + '/d.txt', 'utf8')
                const file = {
                    id: id,
                    hash: d,
                    tags: t
                }
                files.push(file)
            }*/
            return files
        } else {
            response.status(401)
        }
    }
}

module.exports = MainController