'use strict'

const dom = {
    name: (name) => {
        return document.getElementsByName(name)
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
    get: async (url) => {
        const res = await fetch(url)
        if (res.ok) {
            return await res.json()
        } else {
            return {}
        }
    },
    csrf: async () => {
        const res = await api.get('/csrf')
        dom.val.name('_csrf', res.token)
    }
}