'use strict'

const fs = use('fs')
const Env = use('Env')
const User = use('App/Models/User')
const Token = use('App/Models/Token')

class MainController {
    alive() {
        return {
            alive: true
        }
    }
    csrf({ request }) {
        return {
            token: request.csrfToken
        }
    }
    async user({ auth }) {
        if (auth.user) {
            return auth.user.email
        }
        return null
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
}

module.exports = MainController