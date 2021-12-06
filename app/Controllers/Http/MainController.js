'use strict'

const fs = use('fs')
const Env = use('Env')
const User = use('App/Models/User')

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
        return {
            auth: auth.isLoggedIn,
            user: auth.user
        }
    }
    async login({ auth, request, response }) {
        const { email, password } = request.all()
        await auth.attempt(email, password)
        response.redirect().back()
    }
    async logout() {
        await auth.logout()
        response.redirect().back()
    }
    async signup({ request, response }) {
        const { email, password, secret } = request.all()
        if (secret === Env.get('APP_KEY')) {
            await User.create({
                username: email,
                email: email,
                password: password
            })
        }
        response.redirect().back()
    }
    async dropout({ auth, request }) {
        const { email, password } = request.all()
        const user = await auth.attempt(email, password)
        if (user) {
            await user.delete()
            await auth.logout()
        }
        response.redirect().back()
    }
}

module.exports = MainController