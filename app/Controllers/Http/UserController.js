'use strict'

const Env = use('Env')
const User = use('App/Models/User')

class UserController {
    async get() {
        const users = await User.query().select('email')
        if (users) {
            return {
                ok: true,
                users: users
            }
        }
        return {
            ok: false
        }
    }
    async post({ request }) {
        const { email, password, secret } = request.all()
        if (secret === Env.get('APP_KEY')) {
            await User.create({
                username: email,
                email: email,
                password: password
            })
            return {
                ok: true
            }
        }
        return {
            ok: false
        }
    }
    async put({ auth, request }) {
        try {
            await auth.authenticate()
            await auth.logout()
        } catch (e) {
            const { email, password } = request.all()
            const user = await auth.attempt(email, password)
            if (user) {
                return {
                    ok: true
                }
            }
            return {
                ok: false
            }
        }
    }
    async delete({ auth, request }) {
        const { email, password } = request.all()
        const user = await auth.attempt(email, password)
        if (user) {
            await user.delete()
            await auth.logout()
            return {
                ok: true
            }
        }
        return {
            ok: false
        }
    }
}

module.exports = UserController