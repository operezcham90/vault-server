'use strict'

const Env = use('Env')
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const File = use('App/Models/File')

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
        const uploads = request.files().uploads
        const { tags } = request.all()
        if (auth.user && uploads) {
            let files = uploads
            if (!uploads.length) {
                files = []
                files.push(uploads)
            }
            for (const index in files) {
                await File.store(files[index], tags[index])
            }
        } else {
            response.status(401)
        }
        response.redirect('/')
    }
    async find({ auth, request, response }) {
        let { tags } = request.all()
        if (auth.user) {
            const files = await File.search(tags)
            return files
        } else {
            response.status(401)
        }
    }
}

module.exports = MainController