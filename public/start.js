'use strict'

const view = {
    name: 'hi',
    root: document.createElement('div'),
    show: (name = 'hi') => {
        view.root.remove()
        view.root = document.createElement('div')
        view.write[name]()
        document.body.append(view.root)
    },
    write: {
        hi: () => {
            const login = document.createElement('button')
            login.value = 'Login 🔒'
            login.onclick = view.show('login')
            view.root.append(login)
        }
    }
}