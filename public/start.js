'use strict'

const view = {
    current: view.write.hi,
    root: document.createElement('div'),
    show: (current = view.write.hi) => {
        view.root.remove()
        view.root = document.createElement('div')
        view.current = current
        view.current()
        document.body.append(view.root)
    },
    write: {
        hi: () => {
            const login = document.createElement('button')
            login.value = 'Login 🔒'
            login.onclick = view.show(view.write.login)
            view.root.append(login)
        },
        login: () => {

        }
    }
}