'use strict'

document.body.onload = async () => {
    const csrf = await fetch('/csrf')
    const { token } = await csrf.json()
    const inputs = document.getElementsByName('_csrf')
    for (let input of inputs) {
        input.value = token
    }
    const user = await fetch('/user')
    document.getElementById('user').value = await user.text()
}