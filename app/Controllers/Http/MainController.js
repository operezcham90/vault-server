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
        response.redirect('/')
    }
    async logout({ auth, response }) {
        await auth.logout()
        response.redirect('/')
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
        response.redirect('/')
    }
    async dropout({ auth, request }) {
        const { email, password } = request.all()
        const user = await auth.attempt(email, password)
        if (user) {
            await auth.logout()
            await user.delete()
        }
        response.redirect('/')
    }
}

module.exports = MainController