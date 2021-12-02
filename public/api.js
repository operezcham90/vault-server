'use strict'

const dom = {
    id: (id) => {
        return document.getElementById(id)
    },
    name: (name) => {
        return document.getElementsByName(name)
    },
    form: (id) => {
        return new FormData(dom.id(id));
    },
    val: {
        name: (name, val) => {
            const list = dom.name(name)
            for (const item of list) {
                item.value = val;
            }
        }
    }
}

const api = {
    call: async (url, verb, form = null) => {
        let conf = {
            method: verb
        }
        if (form) {
            conf['body'] = dom.form(form)
        }
        try {
            const res = await fetch(url, conf)
            if (res.ok) {
                return await res.json()
            } else {
                console.error('API fail')
                return {}
            }
        } catch (e) {
            console.error('HTTP fail')
            return {}
        }
    },
    csrf: async () => {
        const res = await api.call('/csrf', 'GET')
        dom.val.name('_csrf', res.token)
    },
    login: async () => {
        const res = await api.call('/login', 'POST', 'login')
        console.log(res)
    },
    signup: async () => {
        const res = await api.call('/signup', 'POST', 'signup')
        console.log(res)
    }
}