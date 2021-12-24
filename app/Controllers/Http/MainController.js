'use strict'

const fs = use('fs')
const Env = use('Env')
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const uuid = use('uuid')

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
        if (auth.user) {
            const path = '/home/serv/uploads'
            const files = request.files()
            let local = []
            try {
                local = await fs.promise.readdir(path)
            } catch (e) {
                local = []
            }
            let i = 0
            let file = files.uploads[i]
            while (file) {
                const name = uuid.v4() + '.' + file.extname
                await file.move(path, {
                    name: name,
                    overwrite: true
                })
                i++
                file = files.uploads[i]
            }
            return local
        } else {
            response.status(401)
        }
        //response.redirect('/')
    }
}

module.exports = MainController