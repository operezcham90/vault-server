'use strict'

const Env = use('Env')
const User = use('App/Models/User')

class UserController {
    async login({ auth, request, response }) {
        const { email, password } = request.all()
        return await auth.remember(true).attempt(email, password)
    }
    async signup({ request, response }) {
        const { email, password, secret } = request.all()
        if (secret === Env.get()) {
            return await User.create({
                username: email.split('@').unshift(),
                email: email,
                password: password
            })
        }
        return null
    }
    async list() {
        return await User.all()
    }
}

module.exports = UserController